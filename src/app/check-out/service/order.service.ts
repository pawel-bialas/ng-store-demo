import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Order} from '../model/Order';
import {ShoppingCartService} from '../../shopping-cart/service/shopping-cart.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  ordersRef: AngularFireList<any>;
  orders$: Observable<any>;

  constructor(private db: AngularFireDatabase, private shoppingCartService: ShoppingCartService) {
  }

  storeOrder(order: Order) {
    const storedOrder = this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return storedOrder.key;
  }

  getAllOrders() {
    this.ordersRef = this.db.list('/orders');
    return this.orders$ = this.ordersRef.snapshotChanges()
      .pipe(map(value => value.map(order => ({key: order.payload.key, ...order.payload.val()}))));
  }

  getOrdersByUser(userId: string) {
    return this.db.list('/orders/', query => {
      return query.orderByChild('userId').equalTo(userId);
    });
  }
}


