import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from './product.service';
import {Product} from './model/Product';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products$: Product[];
  private productsSub: Subscription;

  constructor(productService: ProductService) {
    this.productsSub = productService.getProducts().subscribe(
      products => this.products$ = products
    );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.productsSub.unsubscribe();
  }

}
