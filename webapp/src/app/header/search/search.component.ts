import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoggerService } from 'src/shared/services/logger.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  constructor(private route: Router, private logger: LoggerService) {}
  public search(searchData: string) {
    this.logger.debug('search data -> ' + searchData);
    this.route.navigate(['/search/' ,searchData]);
  }
}
