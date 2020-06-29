import {Injectable, OnDestroy} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {pipe, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {Product} from '../products/model/Product';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService implements OnDestroy {

  itemsSub: Subscription;

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

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private fetchDbCart(cartId: string) {
    return this.db.object('/shopping-carts' + cartId);
  }

  private async getOrCreateCartId() {
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
  }
}

