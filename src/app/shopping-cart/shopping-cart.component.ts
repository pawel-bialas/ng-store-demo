import {Component, OnDestroy, OnInit} from '@angular/core';
import {ShoppingCartService} from './service/shopping-cart.service';
import {ShoppingCart} from './model/ShoppingCart';
import {Subscription} from 'rxjs';

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

  currentCart: ShoppingCart;
  totalPrice: number;
  private cartSub: Subscription;

  constructor(private shoppingCartService: ShoppingCartService) {
  }

  async ngOnInit() {
    await this.shoppingCartService.getCurrentCart().then(value => {
      this.cartSub = value.snapshotChanges().subscribe(cart => {
        const items = cart.payload.child('items').val();
        const key = cart.payload.key;
        const dateCreated = cart.payload.child('dateCreated').val();
        this.currentCart = new ShoppingCart(items);
        this.currentCart.key = key;
        this.currentCart.dateCreated = dateCreated;
        this.totalPrice = this.shoppingCartService.countTotalPrice(this.currentCart);
      });
    });
  }


  clearCart() {
    this.shoppingCartService.clearCart();
  }

  checkOut() {
  }

  ngOnDestroy(): void {
    this.cartSub.unsubscribe();
  }


}
