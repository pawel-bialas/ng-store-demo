import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Order} from './model/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase) {
  }

  storeOrder(order: Order) {
    return this.db.list('/orders').push(order);
  }
}
