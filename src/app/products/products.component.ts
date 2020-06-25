import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from './product.service';
import {Product} from './model/Product';
import {Observable, Subscription} from 'rxjs';
import {CategoryService} from './category.service';
import {Category} from './model/Category';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  categories$: Category[] = [];
  products$: Product[] = [];
  private productsSub: Subscription;
  private categorySub: Subscription;

  constructor(private productService: ProductService, private categoryService: CategoryService) {
    this.productsSub = this.productService.getAllProducts().subscribe(
      products => this.products$ = products
    );
    this.categorySub = this.categoryService.getAllCategories().subscribe(
      categories => this.categories$ = categories
    );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.productsSub.unsubscribe();
    this.categorySub.unsubscribe();
  }

}
