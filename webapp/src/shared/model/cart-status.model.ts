import { ProductModel } from './product.model';

export class CartStatusModel {
  price: number = 0;
  totalNumber: number = 0;
  totalUnitPrice: number = 0;
}

export class CartModel {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  off: number;
  quantity: number = 1;
  unitPrice: number;
  unitsInStock: number;
  description: string;
  newPrice: number;
  constructor(product: ProductModel | CartModel = null) {
    if (product != null) {
      this.id = product.id;
      this.name = product.name;
      this.price = product.newPrice;
      this.imageUrl = product.imageUrl;
      this.off = product.off;
      this.unitPrice = product.unitPrice;
      this.unitPrice = product.unitPrice;
      this.unitsInStock = product.unitsInStock;
      this.description = product.description;
      this.newPrice = product.newPrice;
    }
  }
}
