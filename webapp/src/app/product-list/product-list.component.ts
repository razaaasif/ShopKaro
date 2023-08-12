import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { EmbededProductModel } from 'src/shared/model/embeded.model';
import { ProductModel } from 'src/shared/model/product.model';
import { ProductService } from 'src/shared/services/product.service';
import {
  isNullOrEmptyArray,
  setOfferPrice,
  unsubscribe,
} from 'src/shared/utils';
import { PageModel, PageRequest } from '../../shared/model/page.model';
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
  public pageModel: PageModel = new PageModel(20, 0, 1, 1);
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
    this.productService
      .getByKeyword(this.keyword, this.getPageRequest())
      .subscribe((products) => {
        this.logger.debug(
          'loadByKeyword() products -> ' + JSON.stringify(products)
        );
        this.initProducts(products);
      });
  }
  getPageRequest(): PageRequest {
    return new PageRequest(this.pageModel.size, this.pageModel.number - 1);
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
    this.productService
      .getProducts(this.getPageRequest())
      .subscribe((products) => {
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
      .getProductByCategoryId(this.currentCategoryId, this.getPageRequest())
      .subscribe((products: EmbededProductModel) => {
        this.logger.debug(
          'loadByCategoryId() products -> ' +
            JSON.stringify(products._embedded.products)
        );
        this.initProducts(products);
      });
  }
  initProducts(products: EmbededProductModel) {
    this.logger.debug(
      'initProducts() products -> ' +
        JSON.stringify(products._embedded.products)
    );
    this.logger.debug(
      'initProducts() page -> ' + JSON.stringify(products.page)
    );
    this.pageModel = products.page;
    this.pageModel.number = this.pageModel.number + 1;
    this.products = products._embedded.products?.map((product) => {
      setOfferPrice(product);
      return product;
    });
  }
}
