export enum AppUrl {
  PRODUCTS = 'products',
  PRODUCT_CATEGORY = 'product-category',
  FIND_BY_CATEGORY_ID = 'products/search/findByCategoryId?id={0}&page={1}&size={2}',
  FIND_BY_PRODUCT_NAME = 'products/search/findByNameContaining?name={0}',
  PRODUCTS_BY_PAGINATION = "products/?page={0}&size={1}"
}
