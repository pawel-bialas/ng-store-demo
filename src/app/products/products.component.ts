import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from './product.service';
import {Product} from './model/Product';
import {Subscription} from 'rxjs';
import {CategoryService} from './category.service';
import {Category} from './model/Category';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  categories: Category[] = [];
  products: Product[] = [];
  filteredProducts: Product[] = [];
  private productsSub: Subscription;
  private categoriesSub: Subscription;
  private queryParamsSub: Subscription;
  category: string;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {
    this.productsSub = this.productService.getAllProducts().subscribe(products => {
      this.products = products;
      this.filteredProducts = products;
    });
    this.categoriesSub = this.categoryService.getAllCategories().subscribe(
      categories => this.categories = categories
    );
    this.queryParamsSub = this.route.queryParams.subscribe(params => {
      this.filteredProducts = this.products;
      this.category = params.category;
      this.filteredProducts = (this.category) ?
        this.filteredProducts.filter(product => product.category === this.category) :
        this.products;
    });

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.productsSub.unsubscribe();
    this.categoriesSub.unsubscribe();
    this.queryParamsSub.unsubscribe();
  }

}
