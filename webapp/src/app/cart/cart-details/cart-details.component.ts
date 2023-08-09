import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductCartModelWithQuantity } from 'src/shared/model/cart-status.model';
import { LoggerService } from 'src/shared/services/logger.service';
import { deepCopy } from 'src/shared/utils';
import { ProductCartService } from '../../../shared/services/product-cart-service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css'],
})
export class CartDetailsComponent implements OnInit {
  private _subs: Array<Subscription> = new Array<Subscription>();
  data: Map<number, ProductCartModelWithQuantity> = new Map<
    number,
    ProductCartModelWithQuantity
  >();
  products: Array<ProductCartModelWithQuantity>;

  constructor(
    private productCartService: ProductCartService,
    private logger: LoggerService
  ) {}
  ngOnInit(): void {
    this._subs.push(
      this.productCartService.producService.subscribe((datas) => {
        this.logger.debug('CartDetailsComponent');
        this.logger.debugMap(datas);
        this.data = deepCopy(datas);
      })
    );
  }
}
