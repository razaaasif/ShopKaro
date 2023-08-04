import { Component, Input } from '@angular/core';
import { PageModel } from 'src/shared/model/page.model';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent {
  @Input({ required: true }) pageModel?: PageModel;
  items = [20, 25, 30];
  selectdValue = this.items[0];
  public onChange(event:any){
    console.log(event);
  }
}
