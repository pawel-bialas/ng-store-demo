import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Order} from '../model/Order';
import {ShoppingCartService} from '../../shopping-cart/service/shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase, private shoppingCartService: ShoppingCartService) {
  }

  storeOrder(order: Order) {
    const storedOrder = this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return storedOrder.key;
  }

  getOrders() {
    return this.db.list('/orders');
  }

  getOrdersByUser(userId: string) {
    return this.db.list('/orders/', query => {
      return query.orderByChild('userId').equalTo(userId);
    });
  }
}


