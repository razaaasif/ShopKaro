import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import '@angular/localize/init';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { TruncatePipe } from 'src/shared/pipes/truncate.pipe';
import { HttpInterceptorService } from 'src/shared/services/http-interceptor.service';
import { AppComponent } from './app.component';
import { CartDetailsComponent } from './cart/cart-details/cart-details.component';
import { CartStatusComponent } from './cart/cart-status/cart-status.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './header/search/search.component';
import { PaginationComponent } from './product-list/pagination/pagination.component';
import { ProductActionButtonComponent } from './product-list/product-action-button/product-action-button.component';
import { ProductDetailInfoComponent } from './product-list/product-detail/product-detail-info/product-detail-info.component';
import { ProductDetailComponent } from './product-list/product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';
import { SidebarComponent } from './sidebar/sidebar.component';

const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'cart-details', component: CartDetailsComponent },
  { path: 'category/:id', component: ProductListComponent },
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
    CartStatusComponent,
    CartDetailsComponent,
    ProductDetailInfoComponent,
    TruncatePipe,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ButtonModule,
    InputNumberModule,
    InputTextModule,
    FormsModule,
    ButtonModule,
    ReactiveFormsModule,
    RippleModule,
    FieldsetModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, { useHash: true }),
    NgbModule,
    CheckboxModule,
    DropdownModule,
    ReactiveFormsModule,
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
