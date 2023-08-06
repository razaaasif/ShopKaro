import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AddToCartModel } from '../model/add-t-cart.model';
import { ProductModel } from '../model/product.model';
import { deepCopy, isNullOrEmptyArray } from '../utils';
@Injectable({
  providedIn: 'root',
})
export class ProductCartService {
  private productInCart: Array<ProductModel> = new Array<ProductModel>();
  productInCartChange: Subject<Array<ProductModel>> = new Subject<
    Array<ProductModel>
  >();
  productCartStatusChange: Subject<AddToCartModel> =
    new Subject<AddToCartModel>();
  addToCard(product: ProductModel) {
    if (isNullOrEmptyArray(this.productInCart)) {
      this.productInCart = new Array<ProductModel>();
    }
    this.productInCart.push(deepCopy(product));
    this.getCartStatus();
    this.productInCartChange.next(deepCopy(this.productInCart));
  }

  getCartStatus(): void {
    let price = 0;
    this.productInCart?.forEach((data) => {
      price = price + data.newPrice;
    });

    this.productCartStatusChange.next({
      price: price,
      totoalNumber: this.productInCart.length,
    });
  }
}
