import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../../products/product.service';
import {Subject, Subscription} from 'rxjs';
import {Product} from '../../products/model/Product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  dtTrigger: Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {};
  products$: Product[] = [];
  filteredProducts$: Product[] = [];
  productSub: Subscription;

  constructor(private productService: ProductService) {
    this.productSub = this.productService.getProducts().subscribe(
      products => {
        this.filteredProducts$ = this.products$ = products;
        this.dtTrigger.next();
      }
    );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.productSub.unsubscribe();
    this.dtTrigger.unsubscribe();
  }

  filter(query: string) {
    this.filteredProducts$ = (query) ?
      this.products$.filter(product => product.title.toLowerCase().includes(query.toLowerCase())) :
      this.products$;

    this.dtTrigger.next();
  }
}
