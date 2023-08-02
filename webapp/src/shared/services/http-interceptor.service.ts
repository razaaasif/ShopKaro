import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment.development';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HttpInterceptorService implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const urlWithBase = `${environment.baseUrl}${request.url}`;
    console.log('final url ' + urlWithBase);
    const modifiedRequest = request.clone({ url: urlWithBase });
    return next.handle(modifiedRequest);
  }
}
