import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject, Subscription} from 'rxjs';
import {OrderService} from '../../check-out/service/order.service';
import {AuthService} from '../../authentication/auth.service';
import * as firebase from 'firebase';
import {Order} from '../../check-out/model/Order';

@Component({
  selector: 'admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit, OnDestroy {

  orders: Order[] = [];
  isAdmin = false;
  dtTrigger: Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {
    pagingType: 'full_numbers',
    pageLength: 5,
    responsive: true,
    lengthChange: true
  };
  private authServiceSub: Subscription;

  constructor(private orderService: OrderService, private authService: AuthService) {
    this.authServiceSub = this.authService.userModel$.subscribe(user => {
      this.isAdmin = user.isAdmin;
    });
  }

  ngOnInit(): void {
      this.orderService.getAllOrders().subscribe(value => {
        this.orders = value;
        console.log(this.orders);
      });
  }

  ngOnDestroy(): void {
    this.authServiceSub.unsubscribe();
  }

}
