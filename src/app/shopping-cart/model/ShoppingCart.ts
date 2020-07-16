import {CartItem} from './CartItem';
import {Product} from '../../products/model/Product';

export class ShoppingCart {
  key: string;
  dateCreated: number;
  items: CartItem[] = [];

  constructor(public itemsMap: { [key: string]: CartItem }) {
    for (const product in itemsMap) {
      const item = itemsMap[product];
      this.items.push(new CartItem(item.product, item.quantity, item.product.key));
    }
  }

  get totalShoppingCartPrice(): number {
    let sum = 0;
    if (!this.items || this.items.length === 0) {
      return sum;
    }
    const itemsKeys = this.productIds;
    itemsKeys.forEach(itemKey => {
      sum += ((this.items[itemKey].product.price) * (this.items[itemKey].quantity));
    });
    return sum;
  }

  get totalItemsCount(): number {
    if (!this.items) {
      return 0;
    }
    let count = 0;
    // tslint:disable-next-line:forin
    for (const productId in this.items) {
      count += this.items[productId].quantity;
    }
    return count;
  }

  singleItemCount(product: Product): number {
    if (!this.items || !this.itemsMap) {
      return 0;
    } else {
      const item = this.itemsMap[product.key];
      return item ? item.quantity : 0;
    }
  }

  get productIds(): string[] {
    if (!this.items) {
      return [];
    }
    return Object.keys(this.items);
  }
}
