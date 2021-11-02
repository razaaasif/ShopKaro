import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products! : Product[];
  currentCategoryId!:number;
  searchMode!:boolean;

  constructor(private productService:ProductService,
              private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProduct();
    });
    
  }

  listProduct(){
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if(this.searchMode){
      this.handleSearchProduct();
    }
    else{
      this.handleListProduct();
    }
  }
  
  handleSearchProduct() {
    const theKeyword :string = this.route.snapshot.paramMap.get('keyword')!;
    this.productService.searchProducts(theKeyword).subscribe(
      data => {
        this.products = data;
      }
    )
    
  }


  handleListProduct(){
    const hasCategoryId:boolean = this.route.snapshot.paramMap.has('id'); //check if param has id or not 
    if(hasCategoryId){
      //get the category id and convert into number
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }
    else {
      this.currentCategoryId = 1;
    }

    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    );

  }

}
