import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {OrderService} from './order.service';
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

  orderForm: FormGroup;
  currentCart: ShoppingCart;
  userId: string;
  private cartSub: Subscription;
  private userSub: Subscription;

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private shoppingCartService: ShoppingCartService,
    private router: Router
  ) {
  }

  async ngOnInit() {
    this.orderForm = this.createShippingForm();
    this.userSub = this.authService.user$.subscribe(user => this.userId = user.uid);
    await this.shoppingCartService.getCurrentCart().then(value =>
      this.cartSub = value.snapshotChanges().subscribe(cart => {
        const items = cart.payload.child('items').val();
        const key = cart.payload.key;
        const dateCreated = cart.payload.child('dateCreated').val();
        this.currentCart = new ShoppingCart(items);
        this.currentCart.key = key;
        this.currentCart.dateCreated = dateCreated;
      })
    );
  }

  createShippingForm(): FormGroup {
    return new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      addressLine1: new FormControl(''),
      addressLine2: new FormControl(''),
      city: new FormControl(''),
      postalCode: new FormControl('')
    });
  }

   placeOrder() {
    if (this.currentCart && this.orderForm.valid) {
      const order = new Order(this.userId, this.orderForm.value, this.currentCart);
      const orderKey = this.orderService.storeOrder(order);
      this.router.navigate(['/order-success', orderKey]);
    }
  }

  ngOnDestroy(): void {
    this.cartSub.unsubscribe();
    this.userSub.unsubscribe();
  }
}
