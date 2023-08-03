export class ProductModel {
  constructor(
    public id: number,
    public sku: string,
    public name: string,
    public description: string,
    public unitPrice: number,
    public newPrice: number,
    public imageUrl: string,
    public active: boolean,
    public unitsInStock: string,
    public dateCreated: Date,
    public lastUpdated: Date,
    public off: number
  ) {}
}
