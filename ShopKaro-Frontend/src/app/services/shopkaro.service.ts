import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopkaroService {

  constructor() { }
  getCreditCardMonths(startMonth:number): Observable<number[]>{
    let data : number[] =[];
    //nuild an array for "Month dropdown"
    //start at current month and loop until
    for(let theMonth = startMonth; theMonth <= 12 ; theMonth++){
      data.push(theMonth);
    }

    return of(data);//convert into Observable
  }


  getCreditCardYears(): Observable<number[]>{
    let data : number[] =[];
    //Build an array for "Year" dropdown list 
    //start at current and loop until next 10 years
    const startYear : number = new Date().getFullYear();
    const endYear : number = startYear + 10 ; 
    for(let theYear = startYear; theYear <= endYear ; theYear++){
      data.push(theYear);
    }

    return of(data);//convert into Observable
  }
}
