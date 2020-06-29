import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../products/model/Product';
import {ShoppingCartService} from '../shopping-cart/shopping-cart.service';


@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('product') product: Product;
  // tslint:disable-next-line:no-input-rename
  @Input('show-actions') showActions = true;

  constructor(private cartService: ShoppingCartService) {
  }

  ngOnInit(): void {
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
