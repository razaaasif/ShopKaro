import { CartModel } from './cart-status.model';

export class ProductModel extends CartModel {
  public sku: string;
  public active: boolean;
  public dateCreated: Date;
  public lastUpdated: Date;
  constructor() {
    super();
    this.quantity = 1;
  }
}
