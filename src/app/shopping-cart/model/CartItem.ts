import {Product} from '../../products/model/Product';

export class CartItem {

  constructor(public product: Product, public quantity: number, public key: string) {
  }

  get totalPrice(): number {
    return this.product.price * this.quantity;
  }
}
