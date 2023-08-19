export enum AppUrl {
  PRODUCTS = 'products',
  PRODUCT_CATEGORY = 'product-category',
  FIND_BY_CATEGORY_ID = 'products/search/findByCategoryId?id={0}&page={1}&size={2}',
  FIND_BY_PRODUCT_NAME = 'products/search/findByNameContaining?name={0}&page={1}&size={2}',
  PRODUCTS_BY_PAGINATION = 'products?page={0}&size={1}',
  COUNTRY = 'countries',
  ALL_STATE = 'states',
  FIND_STATE_BY_COUNTRY_CODE = 'states/search/findByCountryCode?code={0}',
}
