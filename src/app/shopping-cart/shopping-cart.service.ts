import {Injectable, OnDestroy} from '@angular/core';
import {AngularFireDatabase, AngularFireObject, SnapshotAction} from '@angular/fire/database';
import {Observable, pipe, Subscription} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {Product} from '../products/model/Product';
import {ShoppingCart} from './model/ShoppingCart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService implements OnDestroy {

  private itemsSub: Subscription;
  private cartRef: AngularFireObject<any>;
  private cartSub: Subscription;


  constructor(private db: AngularFireDatabase) {
  }

  async addToCart(product: Product) {
    await this.updateQuantity(product, 1);
  }

  async removeFromCart(product: Product) {
    await this.updateQuantity(product, -1);
  }

  async getCurrentCart(): Promise<AngularFireObject<ShoppingCart>> {
    const currentCartId = await this.getOrCreateCartId();
    return this.cartRef = this.db.object('/shopping-carts/' + currentCartId);

  }

  async clearCart() {
    const currentCartId = await this.getOrCreateCartId();
    return  this.db.object('/shopping-carts/' + currentCartId + '/items').remove();
  }

  countAllItems(cart: ShoppingCart): number {
    let itemsCount = 0;
    if (!cart.items) {
      return itemsCount;
    } else {
      const items = cart.items;
      const itemsKeys = this.getProductIds(cart);
      itemsKeys.forEach(itemKey => {
        itemsCount += (items[itemKey].quantity);
      });
      return itemsCount;
    }
  }

  getProductIds(cart: ShoppingCart) {
    if (!cart.items) {
      return;
    }
    return Object.keys(cart.items);
  }

  countTotalPrice(cart: ShoppingCart): number {
    if (!cart.items) {
      return;
    }
    let sum = 0;
    const itemsKeys = this.getProductIds(cart);
    itemsKeys.forEach(itemKey => {
      sum += ((cart.items[itemKey].product.price) * (cart.items[itemKey].quantity));
    });
    return sum;
  }

  private async updateQuantity(product: Product, change: number) {
    const currentCartId = await this.getOrCreateCartId();
    const itemRef = this.db.object('/shopping-carts/' + currentCartId + '/items/' + product.key);

    this.itemsSub = itemRef.snapshotChanges().subscribe(item => {
      const quantity = item.payload.child('quantity').val();
      if ((quantity === 1) && (change === -1)) {
        itemRef.remove();
        this.itemsSub.unsubscribe();
        return;
      } else {
        itemRef.update({product, quantity: (quantity || 0) + change});
        this.itemsSub.unsubscribe();
        return;
      }
    });
  }


  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }


  private async getOrCreateCartId(): Promise<string> {
    const cartId = localStorage.getItem('cartId');
    if (cartId) {
      return cartId;
    }
    const newCart = await this.create();
    localStorage.setItem('cartId', newCart.key);
    return newCart.key;
  }

  ngOnDestroy(): void {
    this.itemsSub.unsubscribe();
    this.cartSub.unsubscribe();
  }



}

