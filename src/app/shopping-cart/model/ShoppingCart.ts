import {CartItem} from './CartItem';

export class ShoppingCart {
  key: string;
  dateCreated: number;
  items: CartItem[] = [];

  constructor(public itemsMap: { [key: string]: CartItem }) {
    const itemKeys = Object.keys(itemsMap);
    itemKeys.forEach(key => {
      this.items.push(itemsMap[key]);
    });
  }

  get totalItemsCount() {
    let itemsCount = 0;
    const items = this.itemsMap;
    const itemsKeys = Object.keys(this.itemsMap);
    itemsKeys.forEach(itemKey => {
      itemsCount = itemsCount + (items[itemKey].quantity);
    });
    return itemsCount;
  }
}
