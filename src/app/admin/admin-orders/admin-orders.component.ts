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
  private ordersSub: Subscription;

  constructor(private orderService: OrderService) {
  }

  ngOnInit(): void {
      this.ordersSub = this.orderService.getAllOrders().subscribe(value => {
        this.orders = value;
        this.dtTrigger.next();
      });
  }

  ngOnDestroy(): void {
    this.ordersSub.unsubscribe();
  }

}
