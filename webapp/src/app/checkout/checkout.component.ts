import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Country, State, City } from 'country-state-city';
import { Subscription } from 'rxjs';
import { CountryModel } from 'src/shared/model/country.model';
import { StateModel } from 'src/shared/model/state.model';
import { FormServiceService } from 'src/shared/services/form-service.service';
import { LoggerService } from 'src/shared/services/logger.service';
import {
  isOnlyNumber,
  isOnlyText,
  isValidText,
  isWhiteSpaceAllowedBetween,
  safeTrim,
} from 'src/shared/utils';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  private _subs: Array<Subscription> = new Array<Subscription>();
  countries: Array<CountryModel> = new Array<CountryModel>();
  states: Array<StateModel> = new Array<StateModel>();
  public checkOutFormGroup: FormGroup;
  public totalPrice: number = 0;
  public totalQuantity: number = 0;
  public years: Array<number> = new Array<number>();
  public months: Array<number> = new Array<number>();
  public safeTrim = safeTrim;
  constructor(
    private formBuilder: FormBuilder,
    private formService: FormServiceService,
    private logger: LoggerService
  ) {}

  ngOnInit(): void {
    this.checkOutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          isOnlyText,
        ]),
        lastName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          isOnlyText,
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ]),
      }),
      shippingAddress: this.formBuilder.group({
        country: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          isOnlyText,
        ]),
        street: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          isValidText,
        ]),
        city: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          isOnlyText,
        ]),
        state: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          isOnlyText,
        ]),
        zipCode: new FormControl('', [
          Validators.required,
          Validators.min(10000),
          isOnlyNumber,
        ]),
      }),
      creditCard: this.formBuilder.group({
        cardType: new FormControl('', [Validators.required]),
        nameOnCard: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          isWhiteSpaceAllowedBetween,
        ]),
        cardNumber: new FormControl('', [
          Validators.required,
          Validators.pattern('[0-9]{16}'),
          isOnlyNumber,
        ]),
        securityCode: new FormControl('', [
          Validators.required,
          Validators.pattern('[0-9]{3}'),
          isOnlyNumber,
        ]),
        expirationMonth: new FormControl('', [Validators.required]),
        expirationYear: new FormControl('', [Validators.required]),
      }),
    });
    this._subs.push(
      this.formService
        .getCreditCardMonths(new Date().getMonth() + 1)
        .subscribe((months) => {
          this.months = months;
          this.logger.debug('ngOnInit Months: -> ' + this.months);
        }),
      this.formService.getCreditCardYears().subscribe((years) => {
        this.years = years;
        this.logger.debug('ngOnInit Years: -> ' + this.years);
      }),
      this.formService.getCountries().subscribe((countries) => {
        this.countries = countries.map((country) => {
          country.label = `${country.code} - ${country.name}`;
          return country;
        });
        this.logger.debug(
          'ngOnInit countries: -> ' + JSON.stringify(this.countries)
        );
      })
    );
  }

  onChangeYear(year: Event) {
    const expirationYear =
      this.checkOutFormGroup.get('creditCard').value['expirationYear'];
    console.log('onChangeYear -> ' + JSON.stringify(expirationYear));
    let month = 1;
    const date = new Date();
    this.logger.debug(
      'onChangeYear date.getFullYear(): -> ' + date.getFullYear()
    );

    if (expirationYear === date.getFullYear()) {
      month = date.getMonth() + 1;
      this.logger.debug('onChangeYear Month: -> ' + month);
    }
    this.logger.debug('selected year: ' + JSON.stringify(expirationYear));
    this._subs.push(
      this.formService.getCreditCardMonths(month).subscribe((months) => {
        this.months = months;
        this.logger.debug('onChangeYear Months: -> ' + this.months);
      })
    );
  }

  onSubmit(): void {
    this.logger.debug(this.checkOutFormGroup.getRawValue());
    if (this.checkOutFormGroup.invalid) {
      this.checkOutFormGroup.markAllAsTouched();
    }
  }

  getState(address: Event): void {
    const selectedCountry = (address.target as HTMLSelectElement).value;
    const index = selectedCountry.split(':')[0];
    console.log(
      'getState() address ->' + JSON.stringify(this.countries[index])
    );
    const code = this.countries[index].code;
    this.formService.getStates(code).subscribe((states) => {
      console.log('getState() Response states: ' + JSON.stringify(states));
      this.states = states.map((state) => {
        state.label = state.name;
        return state;
      });
    });
    const stateCode = State.getStatesOfCountry('IN');
    this.logger.debug('stateCode: ' + JSON.stringify(stateCode));
  }

  get firstName() {
    return this.checkOutFormGroup.get('customer.firstName');
  }
  get lastName() {
    return this.checkOutFormGroup.get('customer.lastName');
  }

  get email() {
    return this.checkOutFormGroup.get('customer.email');
  }

  get shippingAddressStreet() {
    return this.checkOutFormGroup.get('shippingAddress.street');
  }

  get shippingAddressCity() {
    return this.checkOutFormGroup.get('shippingAddress.city');
  }

  get shippingAddressState() {
    return this.checkOutFormGroup.get('shippingAddress.state');
  }

  get shippingAddressCoutry() {
    return this.checkOutFormGroup.get('shippingAddress.country');
  }
  get shippingAddressZipCode() {
    return this.checkOutFormGroup.get('shippingAddress.zipCode');
  }

  get creditCardCardType() {
    return this.checkOutFormGroup.get('creditCard.cardType');
  }

  get creditCardNameOnCard() {
    return this.checkOutFormGroup.get('creditCard.nameOnCard');
  }

  get creditCardCardNumber() {
    return this.checkOutFormGroup.get('creditCard.cardNumber');
  }

  get creditCardSecurityCode() {
    return this.checkOutFormGroup.get('creditCard.securityCode');
  }

  get creditCardExpirationMonth() {
    return this.checkOutFormGroup.get('creditCard.expirationMonth');
  }

  get creditCardExpirationYear() {
    return this.checkOutFormGroup.get('creditCard.expirationYear');
  }
}
