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

export class ProductCartModelWithQuantity {
  product: CartModel;
  quantity: number = 0;
  constructor(product: ProductModel) {
    this.product = new CartModel(product);
  }
}
