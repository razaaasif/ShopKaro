import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { AppUrl } from '../../app/app-url';
import { EmbededProductModel } from '../model/embeded.model';
import { PageRequest } from '../model/page.model';
import { ProductCategory } from '../model/product-category.model';
import { ProductModel } from '../model/product.model';
import { replaceUrlParameters, safeTrim } from '../utils';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient, private logger: LoggerService) {}

  getProductCategories(): Observable<Array<ProductCategory>> {
    return this.http
      .get<{
        _embedded: {
          productCategory: Array<ProductCategory>;
        };
      }>(AppUrl.PRODUCT_CATEGORY)
      .pipe(map((response) => response._embedded.productCategory));
  }

  getProducts(page: PageRequest): Observable<EmbededProductModel> {
    this.logger.debug('getProducts() starts');

    return this.getProductByUrl(
      page == null
        ? AppUrl.PRODUCTS
        : replaceUrlParameters(
            AppUrl.PRODUCTS_BY_PAGINATION,
            page.number,
            page.size
          )
    );
  }

  getProductByCategoryId(
    id: number,
    page: PageRequest
  ): Observable<EmbededProductModel> {
    if (!isNaN(id)) {
      this.logger.debug('getProducts() id starts' + id);
      return this.getProductByUrl(
        replaceUrlParameters(
          AppUrl.FIND_BY_CATEGORY_ID,
          id,
          page.number,
          page.size
        )
      );
    } else {
      return this.getProducts(page);
    }
  }

  private getProductByUrl(URL: string): Observable<EmbededProductModel> {
    return this.http.get<EmbededProductModel>(URL);
  }

  getByKeyword(
    search: string,
    page: PageRequest
  ): Observable<EmbededProductModel> {
    this.logger.debug('getByKeyword() search' + search);
    if (safeTrim(search) === '') {
      return this.getProducts(page);
    }
    this.logger.debug('getByKeyword() search' + search);
    return this.getProductByUrl(
      replaceUrlParameters(
        AppUrl.FIND_BY_PRODUCT_NAME,
        search
      )
    );
  }

  getProductById(id: number): Observable<ProductModel> {
    return this.http.get<ProductModel>(AppUrl.PRODUCTS + '/' + id);
  }
}
