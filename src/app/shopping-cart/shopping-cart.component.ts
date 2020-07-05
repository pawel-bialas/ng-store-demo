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
      this.cartSub = value.snapshotChanges().subscribe(cart => {
        this.currentCart = ({key: cart.key, ...cart.payload.val()});
        this.itemsCount = this.shoppingCartService.countAllItems(this.currentCart);
        this.productIds = this.shoppingCartService.getProductIds(this.currentCart);
        this.totalPrice = this.shoppingCartService.countTotalPrice(this.currentCart);
      });
    });
  }

  ngOnDestroy(): void {
    this.cartSub.unsubscribe();
  }


}
