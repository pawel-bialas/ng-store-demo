import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {OrderService} from './service/order.service';
import {AuthService} from '../authentication/auth.service';
import {ShoppingCartService} from '../shopping-cart/service/shopping-cart.service';
import {ShoppingCart} from '../shopping-cart/model/ShoppingCart';
import {Subscription} from 'rxjs';
import {Order} from './model/Order';
import {Router} from '@angular/router';

@Component({
  selector: 'check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {


  currentCart: ShoppingCart;
  userId: string;
  private subscription: Subscription = new Subscription();

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private shoppingCartService: ShoppingCartService,
  ) {
  }

  async ngOnInit() {
    this.subscription.add(this.authService.user$.subscribe(user => this.userId = user.uid));
    await this.shoppingCartService.getCurrentCart().then(value =>
      this.subscription.add(value.snapshotChanges().subscribe(cart => {
        const items = cart.payload.child('items').val();
        const key = cart.payload.key;
        const dateCreated = cart.payload.child('dateCreated').val();
        this.currentCart = new ShoppingCart(items);
        this.currentCart.key = key;
        this.currentCart.dateCreated = dateCreated;
      })
    ));
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
