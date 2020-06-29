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
  // tslint:disable-next-line:no-input-rename
  @Input('shopping-cart') shoppingCart;

  constructor(private cartService: ShoppingCartService) {
  }

  ngOnInit(): void {
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

    getQuantity() {
    if (!this.shoppingCart) {
      return 0;
    }
    const item =  this.shoppingCart.items[this.product.key];
    console.log(item);
    return item ? item.quantity : 0;
  }
}
