import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductModel } from '../model/product.model';
import { environment } from '../../environments/environment.development';
import { AppUrl } from '../../app/app-url';
import { map } from 'rxjs/internal/operators/map';
import { Observable } from 'rxjs';
import { LoggerService } from './logger.service';
import { ProductCategory } from '../model/product-category.model';
import { replaceUrlParameters, safeTrim } from '../utils';

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

  getProducts(): Observable<ProductModel[]> {
    this.logger.debug('getProducts() starts');
    return this.getByUrl(AppUrl.PRODUCTS);
  }

  getProductByCategoryId(id: number): Observable<Array<ProductModel>> {
    if (!isNaN(id)) {
      this.logger.debug('getProducts() id starts' + id);
      return this.getByUrl(
        replaceUrlParameters(AppUrl.FIND_BY_CATEGORY_ID, id)
      );
    } else {
      return this.getProducts();
    }
  }

  private getByUrl(URL: string): Observable<Array<ProductModel>> {
    return this.http
      .get<{ _embedded: { products: Array<ProductModel> } }>(URL)
      .pipe(map((response) => response._embedded.products));
  }

  getByKeyword(search: string): Observable<Array<ProductModel>> {
    this.logger.debug('getByKeyword() search' + search);
    if (safeTrim(search) === '') {
      return this.getProducts();
    }
    this.logger.debug('getByKeyword() search' + search);
    return this.getByUrl(
      replaceUrlParameters(AppUrl.FIND_BY_PRODUCT_NAME, search)
    );
  }
}
