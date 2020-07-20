import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';
import {Order} from '../model/Order';
import {ShoppingCartService} from '../../shopping-cart/service/shopping-cart.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private allOrdersRef: AngularFireList<any>;
  private allOrders$: Observable<any>;
  private myOrdersRef: AngularFireList<any>;
  private myOrders$: Observable<any>;
  private orderByKeyRef: AngularFireList<any>;
  private orderByKey$: Observable<any>;

  constructor(private db: AngularFireDatabase, private shoppingCartService: ShoppingCartService) {
  }

  storeOrder(order: Order) {
    const storedOrder = this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return storedOrder.key;
  }

  getAllOrders() {
    this.allOrdersRef = this.db.list('/orders');
    return this.allOrders$ = this.allOrdersRef.snapshotChanges()
      .pipe(map(value => value.map(order => ({key: order.payload.key, ...order.payload.val()}))));
  }

  getOrderByKey(orderKey) {
    this.orderByKeyRef = this.db.list('/orders/', ref => {
      return ref.orderByKey().equalTo(orderKey);
    });
    return this.orderByKey$ = this.orderByKeyRef.snapshotChanges()
      .pipe(map(value => value.map(order => ({key: order.payload.key, ...order.payload.val()}))));
  }

  getOrdersByUser(userId) {
    this.myOrdersRef = this.db.list('/orders', ref => {
      return ref.orderByChild('userId').equalTo(userId);
    });
    return this.myOrders$ = this.myOrdersRef.snapshotChanges()
      .pipe(map(value => value.map(order => ({key: order.payload.key, ...order.payload.val()}))));
  }
}


