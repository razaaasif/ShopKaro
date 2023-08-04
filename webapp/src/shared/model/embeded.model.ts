import { PageModel } from './page.model';
import { ProductModel } from './product.model';

export interface EmbededProductModel {
  _embedded: { products: Array<ProductModel> };
  page: PageModel;
}
