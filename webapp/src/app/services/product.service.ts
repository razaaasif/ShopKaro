import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductModel } from '../model/product.model';
import { environment } from 'src/environments/environment.development';
import { AppUrl } from '../app-url';
import { map } from 'rxjs/internal/operators/map';
import { Observable } from 'rxjs';
import { LoggerService } from './logger.service';
import { ProductCategory } from '../model/product-category.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  getProductCategories(): Observable<Array<{ categoryName: string }>> {
    return this.http
      .get<{
        _embedded: {
          productCategory: Array<ProductCategory>;
        };
      }>(environment.baseUrl + AppUrl.PRODUCT_CATEGORY)
      .pipe(map((response) => response._embedded.productCategory));
  }
  constructor(private http: HttpClient, private logger: LoggerService) {}
  getProducts(): Observable<ProductModel[]> {
    this.logger.debug('getProducts() starts');
    return this.http
      .get<{ _embedded: { products: Array<ProductModel> } }>(
        environment.baseUrl + AppUrl.PRODUCTS
      )
      .pipe(map((response) => response._embedded.products));
  }
}
