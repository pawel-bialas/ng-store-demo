import {Component, OnInit} from '@angular/core';
import {CategoryService} from './category.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;

  constructor(private categoryService: CategoryService) {
    this.categories$ = categoryService.getCategories().valueChanges();
  }

  ngOnInit(): void {
  }

}
