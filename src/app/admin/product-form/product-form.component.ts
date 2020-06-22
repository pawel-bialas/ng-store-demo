import {Component, OnDestroy, OnInit} from '@angular/core';
import {Category, CategoryService} from './category.service';
import {Observable, Subscription} from 'rxjs';
import {ProductService} from '../../products/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnDestroy  {

  categories$: Category[];
  categorySub: Subscription;

  constructor(private categoryService: CategoryService,
              private productService: ProductService
              ) {

  }

  ngOnInit(): void {
    this.categorySub = this.categoryService.getCategories().subscribe(
      categories => this.categories$ = categories
    );
  }

  save(product: any) {
    this.productService.create(product);
  }

  ngOnDestroy(): void {
    this.categorySub.unsubscribe();
  }
}
