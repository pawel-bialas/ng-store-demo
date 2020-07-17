import {ShoppingCart} from '../../shopping-cart/model/ShoppingCart';

export class Order {
  key: string;
  datePlaced: number;
  items: any[] = [];
  orderPrice: number = this.currentCart.totalShoppingCartPrice;

  constructor(public userId: string, public shipping: any, private currentCart: ShoppingCart) {
    this.datePlaced = new Date().getTime();
    this.items = currentCart.items.map(item => {
      return {
        product: {
          title: item.product.title,
          imageUrl: item.product.imageUrl,
          price: item.product.price
        },
        quantity: item.quantity,
        totalItemPrice: item.totalItemPrice
      };
    });
  }
}
