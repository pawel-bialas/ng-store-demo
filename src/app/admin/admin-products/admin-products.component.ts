import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../../products/product.service';
import {Subscription} from 'rxjs';
import {Product} from '../../products/model/Product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  products$: Product[];
  productSub: Subscription;

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.productSub = this.productService.getProducts().subscribe(
      products => this.products$ = products
    );
  }

  ngOnDestroy(): void {
    this.productSub.unsubscribe();
  }

}
