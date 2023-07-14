import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductModel } from '../model/product.model';
import { environment } from 'src/environments/environment.development';
import { AppUrl } from '../app-url';
import { map } from 'rxjs/internal/operators/map';
import { Observable } from 'rxjs';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
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
