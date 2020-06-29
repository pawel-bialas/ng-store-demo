import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../authentication/auth.service';
import {UserModel} from '../user/model/user-model';
import {Router} from '@angular/router';
import {ShoppingCartService} from '../shopping-cart/shopping-cart.service';
import {ShoppingCart} from '../shopping-cart/model/ShoppingCart';
import {Subscription} from 'rxjs';

@Component({
  selector: 'main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit, OnDestroy {
  userModel: UserModel;
  itemsCount = 0;

  constructor(
    private auth: AuthService,
    private router: Router,
    private shoppingCartService: ShoppingCartService
  ) {
    this.auth.userModel$.subscribe(userModel => this.userModel = userModel);
  }

  // Only one instance per application, no need to unsubscribe;

  async ngOnInit() {
    await this.shoppingCartService.getCurrentCart().then(value => {
      value.valueChanges().subscribe(cart => {
        this.itemsCount = 0;
        const items = cart.items;
        const itemsKeys = Object.keys(items);
        itemsKeys.forEach(itemKey => {
        this.itemsCount = this.itemsCount + (items[itemKey].quantity);
        });
      });
    });
  }

  ngOnDestroy(): void {
  }

  async logout() {
    await this.auth.logout();
    this.router.navigate(['/']);
  }

}
