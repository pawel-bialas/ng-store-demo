import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../../products/service/product.service';
import {Subject, Subscription} from 'rxjs';
import {Product} from '../../products/model/Product';

@Component({
  selector: 'admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  dtTrigger: Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {
    pagingType: 'full_numbers',
    pageLength: 5,
    responsive: true,
    lengthChange: true
  };
  products$: Product[] = [];
  filteredProducts$: Product[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.subscription.add(this.productService.getAllProducts().subscribe(
      products => {
        this.filteredProducts$ = this.products$ = products;
        this.dtTrigger.next();
      }
    ));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.dtTrigger.unsubscribe();
  }

  filter(query: string) {
    this.filteredProducts$ = (query) ?
      this.products$.filter(product => product.title.toLowerCase().includes(query.toLowerCase())) :
      this.products$;

    this.dtTrigger.next();
  }
}
