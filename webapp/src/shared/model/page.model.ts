export class PageModel {
  constructor(
    public size: number,
    public totalElements: number,
    public totalPages: number,
    public number: number
  ) {
    this.size = 10;
  }
}
export class PageRequest {
  constructor(public size: number, public number: number) {}
}
