import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../products/model/Product';
import {ShoppingCartService} from '../shopping-cart/shopping-cart.service';
import {ShoppingCart} from '../shopping-cart/model/ShoppingCart';


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
  // tslint:disable-next-line:no-input-rename
  @Input('shopping-cart') currentCart: ShoppingCart;

  constructor(private cartService: ShoppingCartService) {
  }

  ngOnInit(): void {
    console.log('product-card' + this.currentCart);
  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }

}
