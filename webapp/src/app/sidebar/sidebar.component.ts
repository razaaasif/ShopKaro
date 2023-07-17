import { Component, OnInit } from '@angular/core';
import { ProductCategory } from '../model/product-category.model';
import { ProductService } from '../services/product.service';
import { LoggerService } from '../services/logger.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  public categories: Array<ProductCategory> = new Array<ProductCategory>();
  constructor(
    private productService: ProductService,
    private logger: LoggerService
  ) {}
  ngOnInit(): void {
    this.loadProductCategory();
  }

  loadProductCategory() {
    this.productService
      .getProductCategories()
      .subscribe((categories: Array<ProductCategory>) => {
        // this.logger.debug(
        //   'loadProductCategory() category -> ' + JSON.stringify(categories)
        // );
        this.categories = categories.map((item) => {
          return new ProductCategory(item.categoryName);
        });
        this.logger.debug(
          'loadProductCategory()  categories  -> ' +
            JSON.stringify(this.categories)
        );
      });
  }
}
