import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../authentication/auth.service';
import {UserModel} from '../user/model/user-model';
import {Router} from '@angular/router';
import {ShoppingCartService} from '../shopping-cart/shopping-cart.service';
import {Subscription} from 'rxjs';
import {ShoppingCart} from '../shopping-cart/model/ShoppingCart';

@Component({
  selector: 'main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit, OnDestroy {

  userModel: UserModel;
  currentCart: ShoppingCart;
  itemsCount: number;
  private cartSub: Subscription;


  constructor(
    private auth: AuthService,
    private router: Router,
    private shoppingCartService: ShoppingCartService
  ) {
  }

  // Only one instance per application, no need to unsubscribe, but let's do so :);

  async ngOnInit() {
    await this.shoppingCartService.getCurrentCart().then(value =>
      this.cartSub = value.snapshotChanges().subscribe(cart => {
        this.currentCart = ({key: cart.key, ...cart.payload.val()});
        this.itemsCount = this.shoppingCartService.countAllItems(this.currentCart);
      })
    );
    this.auth.userModel$.subscribe(userModel => this.userModel = userModel);
  }

  ngOnDestroy(): void {
    this.cartSub.unsubscribe();
  }

  async logout() {
    await this.auth.logout();
    this.router.navigate(['/']);
  }

}
