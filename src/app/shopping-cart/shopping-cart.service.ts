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
  private shoppingCart: ShoppingCart;
  private cartSub: Subscription;


  constructor(private db: AngularFireDatabase) {
  }

  async addToCart(product: Product) {
    const currentCartId = await this.getOrCreateCartId();
    const itemRef = this.db.object('/shopping-carts/' + currentCartId + '/items/' + product.key);

    this.itemsSub = itemRef.snapshotChanges().subscribe(item => {
      const quantity = item.payload.child('quantity').val();
      itemRef.update({product, quantity: (quantity || 0) + 1});
      this.itemsSub.unsubscribe();
      return;
    });
  }

  async removeFromCart(product: Product) {

  }

  async getCurrentCart()  {
    const currentCartId = await this.getOrCreateCartId();
    return this.cartRef = this.db.object('/shopping-carts/' + currentCartId);

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

