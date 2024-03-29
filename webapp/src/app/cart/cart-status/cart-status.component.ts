import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartStatusModel } from 'src/shared/model/cart-status.model';
import { LoggerService } from 'src/shared/services/logger.service';
import { ProductCartService } from 'src/shared/services/product-cart-service';
import { unsubscribe } from 'src/shared/utils';
import { isNullOrEmptyArray } from '../../../shared/utils';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css'],
})
export class CartStatusComponent implements OnInit, OnDestroy {
  public cartStatus: CartStatusModel = new CartStatusModel();
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
      this.productCartService.productCartStatus$.subscribe((data) => {
        this.cartStatus = data;
        this.logger.debug(
          'ProductCartComponent ngOnInit() cartStatus: ' +
            JSON.stringify(this.cartStatus)
        );
      })
    );
  }
}
