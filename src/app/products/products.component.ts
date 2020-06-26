import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from './product.service';
import {Product} from './model/Product';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {


  products: Product[] = [];
  filteredProducts: Product[] = [];
  private productsSub: Subscription;
  private queryParamsSub: Subscription;
  category: string;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {
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

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.productsSub.unsubscribe();
    this.queryParamsSub.unsubscribe();
  }

}
