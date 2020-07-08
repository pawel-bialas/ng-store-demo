import {Product} from '../../products/model/Product';

export interface CartItem {
  key?: string;
  product?: Product;
  quantity?: number;
}
