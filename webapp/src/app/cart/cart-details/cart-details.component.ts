import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartModel } from 'src/shared/model/cart-status.model';
import { LoggerService } from 'src/shared/services/logger.service';
import { ProductCartService } from '../../../shared/services/product-cart-service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css'],
})
export class CartDetailsComponent implements OnInit, OnDestroy {
  private _subs: Array<Subscription> = [];
  public products: CartModel[] = [
    {
      quantity: 1,
      id: 2,
      name: 'Become a Guru in JavaScript',
      price: 18.891,
      imageUrl: 'assets/images/products/books/book-luv2code-1001.png',
      off: 10,
    },
  ];
  public isLoaded = false;

  constructor(
    private productCartService: ProductCartService,
    private logger: LoggerService
  ) {}

  ngOnInit(): void {
    this._subs.push(
      this.productCartService.producService$.subscribe((data) => {
        this.products = data;
        this.isLoaded = true;
        this.logger.debug(
          'CartDetailsComponent ngOnInit() cartStatus: ' +
            JSON.stringify(this.products)
        );
        if (this.products != null && this.products.length === 0) {
          this.products = [
            {
              quantity: 1,
              id: 2,
              name: 'Become a Guru in JavaScript',
              price: 18.891,
              imageUrl: 'assets/images/products/books/book-luv2code-1001.png',
              off: 10,
            },
          ];
        }
      })
    );
  }

  ngOnDestroy(): void {
    this._subs.forEach((sub) => sub.unsubscribe());
  }
}
