import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { AppUrl } from 'src/app/app-url';
import { CountryModel } from '../model/country.model';
import { StateModel } from '../model/state.model';
import { replaceUrlParameters } from '../utils';

@Injectable({
  providedIn: 'root',
})
export class FormServiceService {
  constructor(private http: HttpClient) {}
  getCreditCardMonths(startMonth: number): Observable<Array<number>> {
    let data: Array<number> = [];
    for (let theMonth = startMonth; theMonth <= 12; theMonth++) {
      data.push(theMonth);
    }
    return of(data);
  }

  getCreditCardYears(): Observable<Array<number>> {
    let data: Array<number> = [];
    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;
    for (let year = startYear; year <= endYear; year++) {
      data.push(year);
    }
    return of(data);
  }
  getCountries(): Observable<Array<CountryModel>> {
    return this.http
      .get<{ _embedded: { countries: Array<CountryModel> } }>(AppUrl.COUNTRY)
      .pipe(map((country) => country._embedded.countries));
  }
  getStates(code: string = null): Observable<Array<StateModel>> {
    return this.http
      .get<{ _embedded: { states: Array<StateModel> } }>(
          replaceUrlParameters(AppUrl.FIND_STATE_BY_COUNTRY_CODE, code)
      )
      .pipe(map((country) => country._embedded.states));
  }
}
