import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product-service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  constructor(private http: ProductService) {}

  ngOnInit(): void {
    this.http.getProducts().subscribe((Data) => console.log(Data));
  }
}