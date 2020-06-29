import {CartItem} from './CartItem';

export class ShoppingCart {
  key: string;
  dateCreated: number;

  constructor(public items: CartItem[]){

  }



  get totalItemsCount() {
    let itemsCount = 0;
    const items = this.items;
    const itemsKeys = Object.keys(items);
    itemsKeys.forEach(itemKey => {
      itemsCount = itemsCount + (items[itemKey].quantity);
    });
    return itemsCount;
  }
}
