import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../products/model/Product';
import {ShoppingCartService} from '../shopping-cart/service/shopping-cart.service';
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

  constructor(private shoppingCartService: ShoppingCartService) {
  }
  ngOnInit(): void {
  }
  addToCart() {
    this.shoppingCartService.addToCart(this.product);
  }
  getQuantity() {
    if (!this.currentCart || !this.currentCart.items || !this.currentCart.items[this.product.key]) {
      return 0;
    } else {
      return this.currentCart.items[this.product.key].quantity;
    }
  }
}
