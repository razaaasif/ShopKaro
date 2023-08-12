import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartModel, CartStatusModel } from '../model/cart-status.model';
import { ProductModel } from '../model/product.model';
import { deepCopy, nullSafeMap } from '../utils';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root',
})
export class ProductCartService {
  constructor(private logger: LoggerService) {}
  private products: Map<number, CartModel> = new Map<number, CartModel>();

  private cartStatusModel: CartStatusModel = new CartStatusModel();

  private productCartStatusSubject: BehaviorSubject<CartStatusModel> =
    new BehaviorSubject<CartStatusModel>(this.cartStatusModel);

  private producSubject: BehaviorSubject<Array<CartModel>> =
    new BehaviorSubject<Array<CartModel>>(new Array<CartModel>());

  productCartStatus$: Observable<CartStatusModel> =
    this.productCartStatusSubject.asObservable();

  producService$: Observable<Array<CartModel>> =
    this.producSubject.asObservable();

  increment(product: ProductModel | CartModel): void {
    this.products = nullSafeMap(this.products);
    let newProduct = this.products.get(product.id);
    if (newProduct) {
      newProduct.quantity++;
    } else {
      this.products.set(product.id, new CartModel(product));
    }

    this.logger.debugMap(this.products);
    this.calculatePrice();
  }

  decrement(product: CartModel) {
    this.products = nullSafeMap(this.products);
    const oldProduct = this.products.get(product.id);
    if (oldProduct) {
      oldProduct.quantity--;
    }
    this.calculatePrice();
  }
  calculatePrice() {
    this.cartStatusModel.price = 0;
    this.cartStatusModel.totalUnitPrice = 0;
    this.cartStatusModel.totalNumber = 0;
    Array.from(this.products?.values())?.forEach((item) => {
      this.cartStatusModel.price += item.newPrice * item.quantity;
      this.cartStatusModel.totalNumber += item.quantity;
      this.cartStatusModel.totalUnitPrice += item.unitPrice * item.quantity;
    });
    this.emitCartChanges();
  }

  private emitCartChanges(): void {
    this.producSubject.next(deepCopy(Array.from(this.products.values())));
    this.productCartStatusSubject.next(this.cartStatusModel);
  }
}
