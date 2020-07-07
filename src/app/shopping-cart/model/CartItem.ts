import {Product} from '../../products/model/Product';

export class CartItem {
  key?: string;

  constructor(public product: Product, public quantity: number) {
  }

  get totalPrice(): number {
    return this.product.price * this.quantity;
  }
}
