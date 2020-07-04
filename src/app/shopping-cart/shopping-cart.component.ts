import {Component, OnDestroy, OnInit} from '@angular/core';
import {ShoppingCartService} from './shopping-cart.service';
import {ShoppingCart} from './model/ShoppingCart';
import {Subscription} from 'rxjs';

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

  currentCart: ShoppingCart;
  itemsCount: number;
  productIds: string[];
  totalPrice: number;
  private cartSub: Subscription;

  constructor(private shoppingCartService: ShoppingCartService) {
  }

  async ngOnInit() {
    await this.shoppingCartService.getCurrentCart().then(value => {
      this.cartSub = value.valueChanges().subscribe(cart => {
        this.currentCart = cart;
        this.itemsCount = this.shoppingCartService.countAllItems(cart);
        this.productIds = this.shoppingCartService.getProductIds(cart);
        this.totalPrice = this.shoppingCartService.countTotalPrice(cart);
      });
    });
  }

  ngOnDestroy(): void {
    this.cartSub.unsubscribe();
  }


}
