import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../authentication/auth.service';
import {UserModel} from '../user/model/UserModel';
import {Router} from '@angular/router';
import {ShoppingCartService} from '../shopping-cart/service/shopping-cart.service';
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
  private subscription: Subscription = new Subscription();


  constructor(
    private auth: AuthService,
    private router: Router,
    private shoppingCartService: ShoppingCartService
  ) {
  }

  // Only one instance per application, no need to unsubscribe, but let's do so :);

  async ngOnInit() {
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
    this.subscription.add(this.auth.userModel$.subscribe(userModel => this.userModel = userModel));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  async logout() {
    await this.auth.logout();
    this.router.navigate(['/']);
  }

}
