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
  cartSub: Subscription;
  constructor(private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    await this.shoppingCartService.getCurrentCart().then(value => {
      this.cartSub = value.valueChanges().subscribe(cart => {
        this.currentCart = new ShoppingCart(cart.itemsMap);
      });
    });
  }

  ngOnDestroy(): void {
    this.cartSub.unsubscribe();
  }

}
