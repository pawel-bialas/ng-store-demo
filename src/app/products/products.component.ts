import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from './product.service';
import {Product} from './model/Product';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {ShoppingCartService} from '../shopping-cart/shopping-cart.service';
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
  private productsSub: Subscription;
  private queryParamsSub: Subscription;
  private cartSub: Subscription;

  constructor(
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService,
    private route: ActivatedRoute
  ) {
  }

  async ngOnInit() {
    this.productsSub = this.productService.getAllProducts().subscribe(products => {
      this.products = products;
      this.filteredProducts = products;
    });
    this.queryParamsSub = this.route.queryParams.subscribe(params => {
      this.filteredProducts = this.products;
      this.category = params.category;
      this.filteredProducts = (this.category) ?
        this.filteredProducts.filter(product => product.category === this.category) :
        this.products;
    });
    await this.shoppingCartService.getCurrentCart().then(value => {
      this.cartSub = value.valueChanges().subscribe(cart => {
        this.currentCart = cart;
      });
    });
  }


  ngOnDestroy(): void {
    this.productsSub.unsubscribe();
    this.queryParamsSub.unsubscribe();
    this.cartSub.unsubscribe();
  }

}
