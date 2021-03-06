import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoryService} from '../../products/service/category.service';
import {Subscription} from 'rxjs';
import {ProductService} from '../../products/service/product.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {ActivatedRoute, Router} from '@angular/router';
import {take} from 'rxjs/operators';
import {Category} from '../../products/model/Category';
import {Product} from '../../products/model/Product';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnDestroy {

  categories$: Category[];
  productForm: FormGroup;
  product: Product = {};
  private id: string;
  private subscription: Subscription = new Subscription();

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.productForm = this.createProductForm();
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.subscription.add(this.productService.findById(this.id)
        .valueChanges().pipe(take(1)).subscribe(queryResult => this.product = queryResult));
    }
    this.subscription.add(this.categoryService.getAllCategories().subscribe(
      categories => this.categories$ = categories
    ));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  createProductForm(): FormGroup {
    return new FormGroup({
      title: new FormControl('', Validators.required),
      price: new FormControl(0, Validators.compose([Validators.required, CustomValidators.min(0)])),
      category: new FormControl('', Validators.required),
      imageUrl: new FormControl('', Validators.compose([Validators.required, CustomValidators.url]))
    });
  }

  save() {
    if (this.id && this.productForm.valid) {
      this.productService.update(this.id, this.productForm.value);
    } else {
      this.productService.create(this.productForm.value);
    }
    this.router.navigate(['/admin/products']);
  }


  delete() {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.delete(this.id);
      this.router.navigate(['/admin/products']);
    }
    return;
  }
}
