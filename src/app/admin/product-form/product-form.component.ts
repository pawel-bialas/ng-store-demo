import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoryService} from './category.service';
import {Subscription} from 'rxjs';
import {ProductService} from '../../products/product.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {ActivatedRoute, Router} from '@angular/router';
import {take} from 'rxjs/operators';
import {Category} from '../../products/model/Category';
import {Product} from '../../products/model/Product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnDestroy {

  categories$: Category[];
  categorySub: Subscription;
  productForm: FormGroup;
  product: Product = {};
  private id: string;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.productForm = this.createProductForm();
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService.findById(this.id).valueChanges().pipe(take(1)).subscribe(queryResult => this.product = queryResult);
    }
  }

  ngOnInit(): void {
    this.categorySub = this.categoryService.getCategories().subscribe(
      categories => this.categories$ = categories
    );
  }

  ngOnDestroy(): void {
    this.categorySub.unsubscribe();
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
