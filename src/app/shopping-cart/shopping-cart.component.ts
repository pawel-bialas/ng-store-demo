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

  currentCart: ShoppingCart = new ShoppingCart();
  itemsCount: number;
  productIds: string[];
  totalPrice: number;
  private cartSub: Subscription;

  constructor(private shoppingCartService: ShoppingCartService) {
  }

  async ngOnInit() {
    await this.shoppingCartService.getCurrentCart().then(value => {
      this.cartSub = value.snapshotChanges().subscribe(cart => {
        this.currentCart.key = cart.payload.key;
        this.currentCart.dateCreated = cart.payload.child('dateCreated').val();
        this.currentCart.items = cart.payload.child('items').val();

        this.productIds = this.shoppingCartService.getProductIds(this.currentCart);
        this.totalPrice = this.shoppingCartService.countTotalPrice(this.currentCart);
      });
    });
  }

  ngOnDestroy(): void {
    this.cartSub.unsubscribe();
  }


}
