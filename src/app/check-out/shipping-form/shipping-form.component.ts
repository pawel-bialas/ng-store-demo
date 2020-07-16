import {Component, Input, OnInit} from '@angular/core';
import {ShoppingCart} from '../../shopping-cart/model/ShoppingCart';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Order} from '../model/Order';
import {OrderService} from '../service/order.service';
import {Router} from '@angular/router';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('shopping-cart') currentCart: ShoppingCart;
  // tslint:disable-next-line:no-input-rename
  @Input('userId') userId: string;
  orderForm: FormGroup;

  constructor(private orderService: OrderService, private router: Router) {
  }

  ngOnInit(): void {
    this.orderForm = this.createShippingForm();
  }


  createShippingForm(): FormGroup {
    return new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      streetName: new FormControl('', Validators.required),
      houseNumber: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      postalCode: new FormControl('', Validators.required)
    });
  }

  placeOrder() {
    if (this.currentCart && this.orderForm.valid) {
      const order = new Order(this.userId, this.orderForm.value, this.currentCart);
      const orderKey = this.orderService.storeOrder(order);
      this.router.navigate(['/order-success', orderKey]);
    }
  }

}
