import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ProductModel } from 'src/app/model/product.model';
import { LoggerService } from '../services/logger.service';
import { ProductCategory } from '../model/product-category.model';
import { zip } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: ProductModel[] = [];

  constructor(
    private productService: ProductService,
    private logger: LoggerService
  ) {}

  ngOnInit() {
    this.listProducts();
  }

  listProducts() {
    zip(this.productService.getProducts()).subscribe(
      ([products]: [ProductModel[]]) => {
        this.logger.debug(
          'listProducts() products -> ' + JSON.stringify(products)
        );

        this.products = products.map((product) => {
          this.getOfferPrice(product);
          return product;
        });
      }
    );
  }

  public getOfferPrice(product: ProductModel): void {
    const randomPercentage = Math.floor(Math.random() * 10) + 1;
    product.off = randomPercentage * 10;
    product.newPrice = product.unitPrice * (1 - product.off / 100);
  }
}
