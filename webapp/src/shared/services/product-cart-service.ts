import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartModel, CartStatusModel } from '../model/cart-status.model';
import { ProductModel } from '../model/product.model';
import { deepCopy, nullSafeMap } from '../utils';

@Injectable({
  providedIn: 'root',
})
export class ProductCartService {
  private products: Map<number, CartModel> = new Map<number, CartModel>();
  private totalPrice: number = 0;
  private totalQuantity: number = 0;

  private productCartStatusSubject: BehaviorSubject<CartStatusModel> =
    new BehaviorSubject<CartStatusModel>({
      price: this.totalPrice,
      totalNumber: this.totalQuantity,
    });
  private producSubject: BehaviorSubject<Array<CartModel>> =
    new BehaviorSubject<Array<CartModel>>(new Array<CartModel>());

  productCartStatus$: Observable<CartStatusModel> =
    this.productCartStatusSubject.asObservable();
  producService$: Observable<Array<CartModel>> =
    this.producSubject.asObservable();

  addToCart(product: ProductModel): void {
    this.products = nullSafeMap(this.products);
    const newProduct = this.products.get(product.id) || new CartModel(product);
    newProduct.quantity++;
    this.products.set(product.id, newProduct);
    this.totalQuantity += 1;
    this.totalPrice += product.newPrice;
    this.emitCartChanges();
  }

  private emitCartChanges(): void {
    this.producSubject.next(deepCopy(Array.from(this.products.values())));

    this.productCartStatusSubject.next({
      price: this.totalPrice,
      totalNumber: this.totalQuantity,
    });
  }
}
