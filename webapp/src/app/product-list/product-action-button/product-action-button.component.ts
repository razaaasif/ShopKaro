import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductModel } from 'src/shared/model/product.model';
import { LoggerService } from 'src/shared/services/logger.service';
import { ProductCartService } from 'src/shared/services/product-cart-service';
import { unsubscribe } from 'src/shared/utils';

@Component({
  selector: 'app-product-action-button',
  templateUrl: './product-action-button.component.html',
  styleUrls: ['./product-action-button.component.css'],
})
export class ProductActionButtonComponent implements OnInit, OnDestroy {
  @Input() customStyle?: string;
  @Input({ required: true }) product?: ProductModel;

  private _subs: Array<Subscription> = new Array<Subscription>();
  constructor(
    private productCartService: ProductCartService,
    private logger: LoggerService,
    private router: Router
  ) {}
  ngOnDestroy(): void {
    unsubscribe(this._subs);
  }

  ngOnInit(): void {}
  addToCart(): void {
    this.productCartService.increment(this.product);
  }
  buyNow(): void {
    this.addToCart();
    this.router.navigate(['/cart-details']);
  }
}
