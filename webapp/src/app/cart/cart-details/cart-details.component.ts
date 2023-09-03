import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartModel, CartStatusModel } from 'src/shared/model/cart-status.model';
import { LoggerService } from 'src/shared/services/logger.service';
import { ProductCartService } from 'src/shared/services/product-cart-service';
import { deepCopy } from 'src/shared/utils';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css'],
})
export class CartDetailsComponent implements OnInit, OnDestroy {
  private _subs: Array<Subscription> = [];
  public products: CartModel[] = [];
  public isLoaded = false;
  public cartStatus: CartStatusModel = new CartStatusModel();
  readonly deepCopy = deepCopy;
  public totalUnitPrice: number = 0;
  constructor(
    private productCartService: ProductCartService,
    private logger: LoggerService
  ) {}

  ngOnInit(): void {
    this._subs.push(
      this.productCartService.producService$.subscribe((data) => {
        this.products = deepCopy(data);
        data?.forEach((item) => (this.totalUnitPrice += item.unitPrice));
        this.isLoaded = true;
        this.logger.debug(
          'CartDetailsComponent ngOnInit() cartStatus: ' +
            JSON.stringify(this.products)
        );
      }),
      this.productCartService.productCartStatus$.subscribe((data) => {
        this.cartStatus = data;
        this.logger.debug(
          'ProductCartComponent ngOnInit() cartStatus: ' +
            JSON.stringify(this.cartStatus)
        );
      })
    );
  }

  onChangeQuantity(product: CartModel) {
    this.logger.debug(
      'CartDetailsComponent onChangeQuantity : ' + product.quantity
    );
    if (product.quantity <= 0) {
      product.quantity = 1;
    }
    this.logger.debug(
      'CartDetailsComponent onChangeQuantity : ' + product.quantity
    );
  }

  ngOnDestroy(): void {
    this._subs.forEach((sub) => sub.unsubscribe());
  }
  public changeQuantity(increment: boolean, product: CartModel): void {
    if (increment) this.productCartService.increment(product);
    else this.productCartService.decrement(product);
  }
}
