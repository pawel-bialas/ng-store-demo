import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../products/model/Product';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input('product') product: Product;

  constructor() {
  }

  ngOnInit(): void {
  }

}
