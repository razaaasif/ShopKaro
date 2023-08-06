import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import '@angular/localize/init';
import { RouterModule, Routes } from '@angular/router';
import { HttpInterceptorService } from '../shared/services/http-interceptor.service';
import { AppComponent } from './app.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ProductCartComponent } from './header/product-cart/product-cart.component';
import { SearchComponent } from './header/search/search.component';
import { PaginationComponent } from './product-list/pagination/pagination.component';
import { ProductActionButtonComponent } from './product-list/product-action-button/product-action-button.component';
import { ProductDetailComponent } from './product-list/product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';
import { SidebarComponent } from './sidebar/sidebar.component';
const routes: Routes = [
  { path: 'category/:id', component: ProductListComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'search/:keyword', component: ProductListComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: '**', redirectTo: '/products', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    CheckoutComponent,
    ProductDetailComponent,
    FooterComponent,
    PaginationComponent,
    HeaderComponent,
    SidebarComponent,
    SearchComponent,
    ProductActionButtonComponent,
    ProductCartComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { useHash: true }),
    NgbModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
