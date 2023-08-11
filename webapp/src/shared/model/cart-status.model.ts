import { ProductModel } from './product.model';

export class CartStatusModel {
  price: number;
  totalNumber: number;
}

export class CartModel {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  off: number;
  quantity: number = 0;
  constructor(product: ProductModel = null) {
    if (product != null) {
      this.id = product.id;
      this.name = product.name;
      this.price = product.newPrice;
      this.imageUrl = product.imageUrl;
      this.off = product.off;
    }
  }
}
