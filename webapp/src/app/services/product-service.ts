import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductModel } from '../model/product.model';
import { environment } from 'src/environments/environment.development';
import { AppUrl } from '../app-url';
import { map } from 'rxjs/internal/operators/map';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  getProducts(): Observable<any[]> {
    return this.http
      .get<any>(environment.baseUrl + AppUrl.PRODUCTS)
      .pipe(map((response) => response._embedded.products));
  }
}
