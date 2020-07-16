import {Component, Input, OnInit} from '@angular/core';
import {ShoppingCart} from '../model/ShoppingCart';

@Component({
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('shopping-cart') currentCart: ShoppingCart;

  constructor() {
  }

  ngOnInit(): void {
  }

}
