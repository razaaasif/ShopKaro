import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormServiceService } from 'src/shared/services/form-service.service';
import { LoggerService } from 'src/shared/services/logger.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  private _subs: Array<Subscription> = new Array<Subscription>();
  public checkOutFormGroup: FormGroup;
  public totalPrice: number = 0;
  public totalQuantity: number = 0;
  public years: Array<number> = new Array<number>();
  public months: Array<number> = new Array<number>();
  constructor(
    private formBuilder: FormBuilder,
    private formService: FormServiceService,
    private logger: LoggerService
  ) {}

  ngOnInit(): void {
    this.checkOutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: [''],
      }),
      shippingAddress: this.formBuilder.group({
        country: [''],
        street: [''],
        city: [''],
        state: [''],
        zipCode: [''],
      }),
      billingAddress: this.formBuilder.group({
        country: [''],
        street: [''],
        city: [''],
        state: [''],
        zipCode: [''],
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: [''],
      }),
    });
    this._subs.push(
      this.formService
        .getCreditCardMonths(new Date().getMonth() + 1)
        .subscribe((months) => {
          this.months = months;
          this.logger.debug('Months: -> ' + this.months);
        }),
      this.formService.getCreditCardYears().subscribe((years) => {
        this.years = years;
        this.logger.debug('Years: -> ' + this.years);
      })
    );
  }

  onChangeYear(year: any) {
    let month = 1;
    const date = new Date();
    this.logger.debug(
      'onChangeYear date.getFullYear(): -> ' + date.getFullYear()
    );

    if (year.value === date.getFullYear()) {
      month = date.getMonth() + 1;
      this.logger.debug('onChangeYear Month: -> ' + month);
    }
    this.logger.debug('selected year: ' + JSON.stringify(year.value));
    this._subs.push(
      this.formService.getCreditCardMonths(month).subscribe((months) => {
        this.months = months;
        this.logger.debug('onChangeYear Months: -> ' + this.months);
      })
    );
  }

  onSubmit(): void {
    console.log(this.checkOutFormGroup.getRawValue());
  }

  checked(event: boolean): void {
    console.log('checked : ' + JSON.stringify(event));
    if (event) {
      this.checkOutFormGroup.controls['billingAddress'].setValue(
        this.checkOutFormGroup.controls['shippingAddress'].value
      );
    } else {
      this.checkOutFormGroup.controls['billingAddress'].reset();
    }
  }
}
