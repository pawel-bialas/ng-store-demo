import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Order} from '../check-out/model/Order';
import {ActivatedRoute} from '@angular/router';
import {OrderService} from '../check-out/service/order.service';
import {Observable, Subscription} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {SnapshotAction} from '@angular/fire/database';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit, OnDestroy {

  private orderSub: Subscription;
  order: Order[] = [];


  constructor(private route: ActivatedRoute, private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.orderSub = this.orderService.getOrderByKey(this.route.snapshot.paramMap.get('id')).subscribe(value => {
      this.order = value;
    });
  }

  ngOnDestroy(): void {
    this.orderSub.unsubscribe();
  }
}


