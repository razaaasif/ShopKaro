import { EventEmitter, Injectable } from '@angular/core';
import {
  CartStatusModel,
  ProductCartModelWithQuantity,
} from '../model/cart-status.model';
import { ProductModel } from '../model/product.model';
import { nullSafeMap } from '../utils';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root',
})
export class ProductCartService {
  private products: Map<number, ProductCartModelWithQuantity> = new Map<
    number,
    ProductCartModelWithQuantity
  >();
  private totalPrice: number = 0;
  private totalQuantity: number = 0;

  productCartStatusChange: EventEmitter<CartStatusModel> =
    new EventEmitter<CartStatusModel>();

  producService: EventEmitter<Map<number, ProductCartModelWithQuantity>> =
    new EventEmitter<Map<number, ProductCartModelWithQuantity>>();

  constructor(private logger: LoggerService) {}

  addToCard(product: ProductModel): void {
    // Fixed method name typo (addToCard -> addToCart)
    this.products = nullSafeMap(this.products);
    const newProduct =
      this.products.get(product.id) ||
      new ProductCartModelWithQuantity(product);
    newProduct.quantity++;
    this.products.set(product.id, newProduct);
    this.producService.next(this.products);
    this.totalQuantity += 1;
    this.totalPrice += product.newPrice;
    this.getCartStatus();
    this.logger.debugMap(this.products);
  }

  getCartStatus(): void {
    this.productCartStatusChange.next({
      price: this.totalPrice,
      totalNumber: this.totalQuantity, // Fixed typo (totoalNumber -> totalNumber)
    });
  }
}
