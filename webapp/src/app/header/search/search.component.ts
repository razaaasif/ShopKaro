import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { LoggerService } from 'src/shared/services/logger.service';
import { ProductService } from 'src/shared/services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  constructor(private route: Router, private logger: LoggerService) {}
  public search(searchData: string) {
    this.logger.debug('search data -> ' + searchData);
    this.route.navigateByUrl('/search/' + searchData);
  }
}
