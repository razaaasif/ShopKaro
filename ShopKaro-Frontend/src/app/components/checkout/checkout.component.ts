import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupName } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { CartService } from 'src/app/services/cart.service';
import { ShopkaroService } from 'src/app/services/shopkaro.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup:FormGroup;
  totalQuantity:number=0;
  totalPrice:number=0.0;

  creditCardYears:number[]=[];
  creditCardMonths:number[]=[];

  countries:Country[] = [];

  shippingAddressStates:State[] = [];
  billingAddressStates:State[]=[];

  constructor(private formBuilder:FormBuilder,
              private cartService:CartService,
              private shopKaroService:ShopkaroService ) { }

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer:this.formBuilder.group({
        firstName:[''],
        lastName:[''],
        email:['']
      }),
      shippingAddress:this.formBuilder.group({
        street:[''],
        city:[''],
        state:[''],
        country:[''],
        zipCode:['']
      }),
      billingAddress:this.formBuilder.group({
        street:[''],
        city:[''],
        state:[''],
        country:[''],
        zipCode:[''],
      }),
      creditCard :this.formBuilder.group({
        cardType:[''],
        nameOnCard:[''],
        cardNumber:[''],
        securityCode:[''],
        expirationMonth:[''],
        expirationYear:['']
      })
    });

    this.cartService.totalPrice.subscribe(
      data =>{
        this.totalPrice = data
      }
    )
    const startMonth :number = new Date().getMonth()+1;
    console.log("StartMonth : "+startMonth);

    this.shopKaroService.getCreditCardMonths(startMonth).subscribe(
      data =>{
        console.log("Retrieved credit card months :"+JSON.stringify(data));
        this.creditCardMonths = data;
      }
    );


    this.shopKaroService.getCreditCardYears().subscribe(
      data => {
        console.log("Retrieved credit card years :" +JSON.stringify(data));
        this.creditCardYears = data ;

      }
    )

    //populate the countries

    this.shopKaroService.getCountries().subscribe(
      data =>{
        console.log("Retrieving countries : "+JSON.stringify(data));
        this.countries=data;
      }
    )
    
  }
  

  onSubmit(){
    console.log("Handling the submit button....");
    console.log(this.checkoutFormGroup.get('customer').value);
    console.log("shipping address country is : "+this.checkoutFormGroup.get('shippingAddress').value.country.name);
    console.log("shipping address state is : "+this.checkoutFormGroup.get('shippingAddress').value.state.name);
  }

  copyShippingAddressToBillingAddress(event){
    if(event.target.checked){
      this.checkoutFormGroup.controls.billingAddress
                                    .setValue(this.checkoutFormGroup.controls.shippingAddress.value);

      this.billingAddressStates = this.shippingAddressStates;
    }
    else{
      this.checkoutFormGroup.controls.billingAddress.reset();
      this.billingAddressStates=[];
    }

  }

  handleMonthsAndYears(){
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');
    const currentYear:number = new Date().getFullYear();
    const selectedYear :number = Number(creditCardFormGroup.value.expirationYear);

    let startMonth:number;
    if(currentYear === selectedYear){
      startMonth = new Date().getMonth()+1;
    }

    else{
      startMonth = 1 ;
    }

    this.shopKaroService.getCreditCardMonths(startMonth).subscribe(
      data =>{
        console.log("Retrieved  credit card months : "+JSON.stringify(data));
        this.creditCardMonths = data;
      }
    )
  }


  //get states method
  getStates(formGroupName:string){

    const formGroup = this.checkoutFormGroup.get(formGroupName);
    const countryCode = formGroup.value.country.code;
    const countryName = formGroup.value.country.name;

    console.log(`${formGroupName} country code : ${countryCode}`);
    console.log(`${formGroupName} country name : ${countryName}`);
    this.shopKaroService.getStates(countryCode).subscribe(
      
      data =>{
        if(formGroupName === 'shippingAddress'){
          this.shippingAddressStates = data;
        }
        else{
          this.billingAddressStates = data;
        }

        //select first state as default
        formGroup.get('state').setValue(data[0]);
        
      }
    );

  }

}
