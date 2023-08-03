import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductModel } from 'src/shared/model/product.model';
import { LoggerService } from 'src/shared/services/logger.service';
import { ProductService } from 'src/shared/services/product.service';
import { unsubscribe } from 'src/shared/utils';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit,OnDestroy {
  public product?: ProductModel;
  private _sub: Array<Subscription> = new Array<Subscription>();
  constructor(
    private productService: ProductService,
    private logger: LoggerService,
    private activatedRouter: ActivatedRoute
  ) {}
  ngOnDestroy(): void {
    unsubscribe(this._sub);
  }
  ngOnInit(): void {
    this._sub.push(
      this.activatedRouter.params.subscribe((id) => {
        const productId = +this.activatedRouter.snapshot.paramMap.get('id')!;
        if (productId != null && !isNaN(productId)) {
          this.productService
            .getProductById(productId)
            .subscribe((product: ProductModel) => {
              this.product = product;
            });
        }
      })
    );
  }
}
