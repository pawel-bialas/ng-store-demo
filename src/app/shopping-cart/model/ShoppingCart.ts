import {CartItem} from './CartItem';

export interface ShoppingCart {
  key: string;
  dateCreated: number;
  items: CartItem[];
}
