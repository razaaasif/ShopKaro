import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageModel } from 'src/shared/model/page.model';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent {
  @Input({ required: true }) pageModel?: PageModel;
  @Output() pageChange: EventEmitter<PageModel> = new EventEmitter<PageModel>();

  public items = [5, 10, 20, 30, 40, 50];
  constructor() {
    if (this.pageModel) {
      this.pageModel.size = 20;
    }
  }
  public onChange(event: number) {
    console.log(event);
    if (this.pageModel) {
      this.pageChange.next(this.pageModel);
    }
  }
  onChangeItemsPerPage(item: number) {
    if (this.pageModel && this.pageModel.size !== item) {
      this.pageModel.size = item;
      this.pageModel.number = 1;
      this.onChange(0);
    }
  }
}
