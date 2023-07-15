import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ProductModel } from 'src/app/model/product.model';
import { LoggerService } from '../services/logger.service';

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
    this.productService.getProducts().subscribe((data) => {
      this.logger.debug('listProducts() -> ' + JSON.stringify(data));
      this.products = data;
    });
  }

  getRandomPercentage(): number {
    const randomPercentage = Math.floor(Math.random()) + 1; // Generate a random number between 1 and 100
    return randomPercentage;
  }
}
