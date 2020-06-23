import {Component, OnDestroy, OnInit} from '@angular/core';
import {Category, CategoryService} from './category.service';
import {Subscription} from 'rxjs';
import {ProductService} from '../../products/product.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnDestroy {

  categories$: Category[];
  categorySub: Subscription;
  productForm: FormGroup;

  constructor(private categoryService: CategoryService,
              private productService: ProductService
  ) {
    this.productForm = this.createProductForm();
  }

  ngOnInit(): void {
    this.categorySub = this.categoryService.getCategories().subscribe(
      categories => this.categories$ = categories
    );
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
    console.log(this.productForm.value);
    // this.productService.create(this.productForm.value);
  }

  ngOnDestroy(): void {
    this.categorySub.unsubscribe();
  }
}
