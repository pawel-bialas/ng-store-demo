import {CartItem} from './CartItem';

export class ShoppingCart {
  key?: string;
  dateCreated?: number;
  items?: CartItem[] = [];

  constructor(public itemsMap: { [key: string]: CartItem }) {
    for (const key in itemsMap) {
      const item = itemsMap[key];
      this.items.push(new CartItem(item.product, item.quantity));
    }
    console.log(this.items);
  }

  get totalItemsCount() {
    let itemsCount = 0;
    const items = this.items;
    const itemsKeys = Object.keys(items);
    itemsKeys.forEach(itemKey => {
      itemsCount += items[itemKey].quantity;
    });
    return itemsCount;
  }
}
