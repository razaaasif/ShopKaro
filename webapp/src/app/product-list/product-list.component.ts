import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductModel } from 'src/shared/model/product.model';
import { ProductService } from 'src/shared/services/product.service';
import { isNullOrEmptyArray, unsubscribe } from 'src/shared/utils';
import { LoggerService } from '../../shared/services/logger.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: ProductModel[] = [];
  currentCategoryId: number = -1;
  private _subs: Array<Subscription> = new Array<Subscription>();
  private keyword?: string;

  readonly isNullOrEmptyArray = isNullOrEmptyArray;
  constructor(
    private productService: ProductService,
    private logger: LoggerService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnDestroy(): void {
    unsubscribe(this._subs);
  }

  ngOnInit() {
    this._subs.push(
      this.activatedRoute.params.subscribe((data) => {
        this.logger.debug('ngOnInit() data ' + JSON.stringify(data));
        this.listProducts();
      })
    );
  }
  loadByKeyword(): void {
    this.keyword = this.activatedRoute.snapshot.paramMap.get('keyword')!;
    this.logger.debug('loadByKeyword() : -> ' + this.keyword);
    this.productService.getByKeyword(this.keyword).subscribe((products) => {
      this.logger.debug(
        'loadByKeyword() products -> ' + JSON.stringify(products)
      );
      this.initProducts(products);
    });
  }

  listProducts() {
    const hasCategoryId: boolean =
      this.activatedRoute.snapshot.paramMap.has('id');
    const isSearchMode = this.activatedRoute.snapshot.paramMap.has('keyword');

    if (hasCategoryId) {
      this.loadByCategoryId();
    } else if (isSearchMode) {
      this.loadByKeyword();
    } else {
      this.loadAllProducts();
    }
  }
  loadAllProducts() {
    this.productService.getProducts().subscribe((products) => {
      this.logger.debug(
        'loadAllProducts() products -> ' + JSON.stringify(products)
      );
      this.initProducts(products);
    });
  }
  private loadByCategoryId(): void {
    this.currentCategoryId = +this.activatedRoute.snapshot.paramMap.get('id')!;
    this.productService;
    this.productService
      .getProductByCategoryId(this.currentCategoryId)
      .subscribe((products: ProductModel[]) => {
        this.logger.debug(
          'loadByCategoryId() products -> ' + JSON.stringify(products)
        );
        this.initProducts(products);
      });
  }
  private initProducts(products: ProductModel[]): void {
    this.logger.debug('initProducts() products -> ' + JSON.stringify(products));
    this.products = products?.map((product) => {
      this.getOfferPrice(product);
      return product;
    });
  }
  public getOfferPrice(product: ProductModel): void {
    const randomPercentage = Math.floor(Math.random() * 10) + 1;
    product.off = randomPercentage * 10;
    product.newPrice = product.unitPrice * (1 - product.off / 100);
  }
}
