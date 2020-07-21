import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from './service/product.service';
import {Product} from './model/Product';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {ShoppingCartService} from '../shopping-cart/service/shopping-cart.service';
import {ShoppingCart} from '../shopping-cart/model/ShoppingCart';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {


  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  currentCart: ShoppingCart;
  private subscription: Subscription = new Subscription();
  private queryParamsSub: Subscription;
  private cartSub: Subscription;

  constructor(
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService,
    private route: ActivatedRoute
  ) {
  }

  async ngOnInit() {
    this.subscription.add(this.productService.getAllProducts().subscribe(products => {
      this.products = products;
      this.filteredProducts = products;
    }));
    this.subscription.add(this.route.queryParams.subscribe(params => {
      this.filteredProducts = this.products;
      this.category = params.category;
      this.filteredProducts = (this.category) ?
        this.filteredProducts.filter(product => product.category === this.category) :
        this.products;
    }));
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
