import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject, Subscription} from 'rxjs';
import {OrderService} from '../../check-out/service/order.service';
import {AuthService} from '../../authentication/auth.service';
import * as firebase from 'firebase';
import {Order} from '../../check-out/model/Order';
import {Router} from '@angular/router';

@Component({
  selector: 'admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit, OnDestroy {

  orders: Order[] = [];
  dtTrigger: Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {
    pagingType: 'full_numbers',
    pageLength: 5,
    responsive: true,
    lengthChange: true
  };
  private subscription: Subscription = new Subscription();


  constructor(private orderService: OrderService) {
  }

  async ngOnInit() {
    this.subscription.add(this.orderService.getAllOrders().subscribe(orders => {
      this.orders = orders;
      this.dtTrigger.next();
    }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
