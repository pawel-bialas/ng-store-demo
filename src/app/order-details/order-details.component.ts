import {Component, Input, OnInit} from '@angular/core';
import {Order} from '../check-out/model/Order';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('order') order: Order;

  constructor() {
  }

  ngOnInit(): void {
  }

}
