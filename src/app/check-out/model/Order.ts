import {ShoppingCart} from '../../shopping-cart/model/ShoppingCart';

export class Order {

  datePlaced: number;
  items: any[] = [];

  constructor(public userId: string, public shipping: any, public currentCart: ShoppingCart) {
    console.log(shipping);
    console.log(currentCart);
    console.log(userId);
    this.datePlaced = new Date().getTime();
    this.items = this.currentCart.items.map(item => {
      return {
        product: {
          title: item.product.title,
          imageUrl: item.product.imageUrl,
          price: item.product.price
        },
        quantity: item.quantity,
        totalPrice: item.totalPrice
      };
    });
  }
}
