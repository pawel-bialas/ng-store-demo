import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from './product.service';
import {Product} from './model/Product';
import {Subscription} from 'rxjs';
import {CategoryService} from './category.service';
import {Category} from './model/Category';
import {ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';

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
  category: string;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {
    this.productsSub = this.productService.getAllProducts().subscribe(
      products => this.products$ = products
    );
    this.categorySub = this.categoryService.getAllCategories().subscribe(
      categories => this.categories$ = categories
    );
    const data = this.route.queryParams.subscribe(params => console.log(params));

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.productsSub.unsubscribe();
    this.categorySub.unsubscribe();
  }

}
