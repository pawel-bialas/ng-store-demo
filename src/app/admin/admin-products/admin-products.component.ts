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
  filteredProducts$: Product[];
  productSub: Subscription;

  constructor(private productService: ProductService) {
    this.productSub = this.productService.getProducts().subscribe(
      products => this.filteredProducts$ = this.products$ = products
    );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.productSub.unsubscribe();
  }

  filter(query: string) {
    this.filteredProducts$ = (query) ?
      this.products$.filter(product => product.title.toLowerCase().includes(query.toLowerCase())) :
      this.products$;
  }
}
