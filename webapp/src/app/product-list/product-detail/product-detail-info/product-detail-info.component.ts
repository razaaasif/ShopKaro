import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CartModel } from 'src/shared/model/cart-status.model';
import { setOfferPrice } from 'src/shared/utils';

@Component({
  selector: 'app-product-detail-info',
  templateUrl: './product-detail-info.component.html',
  styleUrls: ['./product-detail-info.component.css'],
})
export class ProductDetailInfoComponent implements OnChanges {
  @Input({ required: true }) product: CartModel;
  @Input() unit: number = 1;
  @Input() limit: number = 100000;
  @Input() styles: string;
  @Input() pointer: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['unit']) {
      console.log('Input value changed:', changes['unit'].currentValue);
      if (this.product) {
        setOfferPrice(this.product, this.unit);
      }
    }
  }
}
