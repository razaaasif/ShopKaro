import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from 'src/shared/services/product.service';
import { ProductModel } from 'src/shared/model/product.model';
import { LoggerService } from '../../shared/services/logger.service';
import { ProductCategory } from '../../shared/model/product-category.model';
import { Subscription, zip } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { unsubscribe } from 'src/shared/utils';

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
