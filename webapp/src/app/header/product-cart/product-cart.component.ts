import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AddToCartModel } from 'src/shared/model/add-t-cart.model';
import { unsubscribe } from 'src/shared/utils';
import { LoggerService } from '../../../shared/services/logger.service';
import { ProductCartService } from '../../../shared/services/product-cart-service';
import { isNullOrEmptyArray } from '../../../shared/utils';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css'],
})
export class ProductCartComponent implements OnInit, OnDestroy {
  public cartStatus: AddToCartModel = new AddToCartModel();
  private _subs: Array<Subscription> = new Array<Subscription>();

  readonly isNullOrEmptyArray = isNullOrEmptyArray;

  constructor(
    private productCartService: ProductCartService,
    private logger: LoggerService
  ) {}
  ngOnDestroy(): void {
    unsubscribe(this._subs);
  }

  ngOnInit(): void {
    this._subs.push(
      this.productCartService.productCartStatusChange.subscribe((data) => {
        this.cartStatus = data;
        this.logger.debug(
          'ProductCartComponent ngOnInit() cartStatus: ' +
            JSON.stringify(this.cartStatus)
        );
      })
    );
  }
}
