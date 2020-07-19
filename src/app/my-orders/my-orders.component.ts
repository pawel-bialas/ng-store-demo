import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {OrderService} from '../check-out/service/order.service';
import {AuthService} from '../authentication/auth.service';
import {Observable, Subject, Subscription} from 'rxjs';
import {Order} from '../check-out/model/Order';
import {map, switchMap} from 'rxjs/operators';

@Component({
  selector: 'my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  userId: string;
  myOrders$: Observable<Order[]>;
  dtTrigger: Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {
    pagingType: 'full_numbers',
    pageLength: 5,
    responsive: true,
    lengthChange: true
  };


  constructor(private orderService: OrderService, private authService: AuthService) {
  }

  // Component

  ngOnInit() {
    this.myOrders$ = this.authService.user$.pipe(switchMap(user => {
      return this.orderService.getOrdersByUser(user.uid);
    }));
  }
}
