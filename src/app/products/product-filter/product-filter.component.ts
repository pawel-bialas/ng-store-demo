import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Category} from '../model/Category';
import {Subscription} from 'rxjs';
import {CategoryService} from '../service/category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit, OnDestroy {

  categories: Category[] = [];
  @Input('category')category: string;
  private categoriesSub: Subscription;

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.categoriesSub = this.categoryService.getAllCategories().subscribe(
      categories => this.categories = categories
    );
  }

  ngOnDestroy(): void {
  }

}
