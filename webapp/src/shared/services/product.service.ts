import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { AppUrl } from '../../app/app-url';
import { EmbededProductModel } from '../model/embeded.model';
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

  getProducts(): Observable<EmbededProductModel> {
    this.logger.debug('getProducts() starts');
    return this.getByUrl(AppUrl.PRODUCTS);
  }

  getProductByCategoryId(
    id: number
  ): Observable<EmbededProductModel> {
    if (!isNaN(id)) {
      this.logger.debug('getProducts() id starts' + id);
      return this.getByUrl(
        replaceUrlParameters(AppUrl.FIND_BY_CATEGORY_ID, id)
      );
    } else {
      return this.getProducts();
    }
  }

  private getByUrl(URL: string): Observable<EmbededProductModel> {
    return this.http.get<EmbededProductModel>(URL);
  }

  getByKeyword(search: string): Observable<EmbededProductModel> {
    this.logger.debug('getByKeyword() search' + search);
    if (safeTrim(search) === '') {
      return this.getProducts();
    }
    this.logger.debug('getByKeyword() search' + search);
    return this.getByUrl(
      replaceUrlParameters(AppUrl.FIND_BY_PRODUCT_NAME, search)
    );
  }

  getProductById(id: number): Observable<ProductModel> {
    return this.http.get<ProductModel>(AppUrl.PRODUCTS + '/' + id);
  }
}
