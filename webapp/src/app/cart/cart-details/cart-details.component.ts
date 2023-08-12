import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartModel, CartStatusModel } from 'src/shared/model/cart-status.model';
import { LoggerService } from 'src/shared/services/logger.service';
import { deepCopy } from 'src/shared/utils';
import { ProductCartService } from '../../../shared/services/product-cart-service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css'],
})
export class CartDetailsComponent implements OnInit, OnDestroy {
  private _subs: Array<Subscription> = [];
  public products: CartModel[] = [];
  public isLoaded = false;
  public cartStatus: CartStatusModel = new CartStatusModel();
  readonly deepCopy = deepCopy;
  public totalUnitPrice: number = 0;
  constructor(
    private productCartService: ProductCartService,
    private logger: LoggerService
  ) {}

  ngOnInit(): void {
    this._subs.push(
      this.productCartService.producService$.subscribe((data) => {
        this.products = deepCopy(data);
        data?.forEach((item) => (this.totalUnitPrice += item.unitPrice));
        this.isLoaded = true;
        this.logger.debug(
          'CartDetailsComponent ngOnInit() cartStatus: ' +
            JSON.stringify(this.products)
        );
        if (this.products != null && this.products.length === 0) {
          this.products = [
            {
              quantity: 2,
              id: 1,
              name: 'Crash Course in Python',
              price: 13.491,
              imageUrl: 'assets/images/products/books/book-luv2code-1000.png',
              off: 10,
              unitPrice: 14.99,
              unitsInStock: 100,
              description:
                'Learn Python at your own pace. The author explains how the technology works in easy-to-understand language. This book includes working examples that you can apply to your own projects. Purchase the book and get started today!',
              newPrice: 13.491,
            },
            {
              quantity: 1,
              id: 2,
              name: 'Become a Guru in JavaScript',
              price: 18.891,
              imageUrl: 'assets/images/products/books/book-luv2code-1001.png',
              off: 10,
              unitPrice: 20.99,
              unitsInStock: 100,
              description:
                'Learn JavaScript at your own pace. The author explains how the technology works in easy-to-understand language. This book includes working examples that you can apply to your own projects. Purchase the book and get started today!',
              newPrice: 18.891,
            },
            {
              quantity: 2,
              id: 3,
              name: 'Exploring Vue.js',
              price: 13.491,
              imageUrl: 'assets/images/products/books/book-luv2code-1002.png',
              off: 10,
              unitPrice: 14.99,
              unitsInStock: 100,
              description:
                'Learn Vue.js at your own pace. The author explains how the technology works in easy-to-understand language. This book includes working examples that you can apply to your own projects. Purchase the book and get started today!',
              newPrice: 13.491,
            },
            {
              quantity: 2,
              id: 4,
              name: 'Advanced Techniques in Big Data',
              price: 12.591000000000001,
              imageUrl: 'assets/images/products/books/book-luv2code-1003.png',
              off: 10,
              unitPrice: 13.99,
              unitsInStock: 100,
              description:
                'Learn Big Data at your own pace. The author explains how the technology works in easy-to-understand language. This book includes working examples that you can apply to your own projects. Purchase the book and get started today!',
              newPrice: 12.591000000000001,
            },
            {
              quantity: 1,
              id: 59,
              name: 'Mouse Pad - Dorian',
              price: 16.191,
              imageUrl:
                'assets/images/products/mousepads/mousepad-luv2code-1004.png',
              off: 10,
              unitPrice: 17.99,
              unitsInStock: 100,
              description:
                'Fractal images are amazing! You can now own a mouse pad with a unique and amazing fractal. The mouse pad is made of a durable and smooth material. Your mouse will easily glide across the mouse pad. This mouse pad will brighten your workspace. Buy it now!',
              newPrice: 16.191,
            },
            {
              quantity: 1,
              id: 60,
              name: 'Mouse Pad - Columbia',
              price: 16.191,
              imageUrl:
                'assets/images/products/mousepads/mousepad-luv2code-1005.png',
              off: 10,
              unitPrice: 17.99,
              unitsInStock: 100,
              description:
                'Fractal images are amazing! You can now own a mouse pad with a unique and amazing fractal. The mouse pad is made of a durable and smooth material. Your mouse will easily glide across the mouse pad. This mouse pad will brighten your workspace. Buy it now!',
              newPrice: 16.191,
            },
            {
              quantity: 1,
              id: 61,
              name: 'Mouse Pad - Worthing',
              price: 16.191,
              imageUrl:
                'assets/images/products/mousepads/mousepad-luv2code-1006.png',
              off: 10,
              unitPrice: 17.99,
              unitsInStock: 100,
              description:
                'Fractal images are amazing! You can now own a mouse pad with a unique and amazing fractal. The mouse pad is made of a durable and smooth material. Your mouse will easily glide across the mouse pad. This mouse pad will brighten your workspace. Buy it now!',
              newPrice: 16.191,
            },
          ];
        }
      }),
      this.productCartService.productCartStatus$.subscribe((data) => {
        this.cartStatus = data;
        this.logger.debug(
          'ProductCartComponent ngOnInit() cartStatus: ' +
            JSON.stringify(this.cartStatus)
        );
      })
    );
  }

  onChangeQuantity(product: CartModel) {
    this.logger.debug(
      'CartDetailsComponent onChangeQuantity : ' + product.quantity
    );
    if (product.quantity <= 0) {
      product.quantity = 1;
    }
    this.logger.debug(
      'CartDetailsComponent onChangeQuantity : ' + product.quantity
    );
  }

  ngOnDestroy(): void {
    this._subs.forEach((sub) => sub.unsubscribe());
  }
  public changeQuantity(increment: boolean, product: CartModel): void {
    if (increment) this.productCartService.increment(product);
    else this.productCartService.decrement(product);
  }
}
