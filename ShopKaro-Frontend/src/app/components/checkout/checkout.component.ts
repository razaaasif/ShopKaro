import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupName, Validators } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { ShopkaroValidators } from 'src/app/common/shopkaro-validators';
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
        firstName:new FormControl('',[Validators.required,
                                      Validators.minLength(2),
                                      ShopkaroValidators.notOnlyWhitespace]),

        lastName:new FormControl('',[Validators.required,
                                    Validators.minLength(2),
                                    ShopkaroValidators.notOnlyWhitespace]),

        email:new FormControl('',[Validators.required, 
                                  Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
      }),


      shippingAddress:this.formBuilder.group({
        street:new FormControl('',[Validators.required,
                                  Validators.minLength(2),
                                  ShopkaroValidators.notOnlyWhitespace]),

        city:new FormControl('',[Validators.required,
                                Validators.minLength(2),
                                ShopkaroValidators.notOnlyWhitespace]),

        state:new FormControl('',[Validators.required]),

        country:new FormControl('',[Validators.required]),

        zipCode:new FormControl('',[Validators.required,
                                    Validators.minLength(5),
                                    ShopkaroValidators.notOnlyWhitespace,
                                    Validators.pattern('[0-9]{5}')]),
      }),



      billingAddress:this.formBuilder.group({
        street:new FormControl('',[Validators.required,
                                    Validators.minLength(2),
                                    ShopkaroValidators.notOnlyWhitespace]),

        city:new FormControl('',[Validators.required,
                                Validators.minLength(2),
                                ShopkaroValidators.notOnlyWhitespace]),

        state:new FormControl('',[Validators.required]),

        country:new FormControl('',[Validators.required]),

        zipCode:new FormControl('',[Validators.required,
                            Validators.minLength(5),
                            ShopkaroValidators.notOnlyWhitespace,
                            Validators.pattern('[0-9]{5}')]),
        }),

      creditCard :this.formBuilder.group({
        cardType:new FormControl('',[Validators.required]),

        nameOnCard:new FormControl('',[Validators.required,
                                      Validators.minLength(2),
                                      ShopkaroValidators.notOnlyWhitespace,
                                      ]),


        cardNumber:new FormControl('',[Validators.required,
                                      Validators.pattern('[0-9]{16}')]),

                                      
        securityCode:new FormControl('',[Validators.required,
                                         Validators.pattern('[0-9]{3}')]),

        expirationMonth:new FormControl('',[Validators.required]),

        expirationYear:new FormControl('',[Validators.required])
      })
    });

    this.cartService.totalPrice.subscribe(
      data =>{
        this.totalPrice = data
      }
    );

    this.cartService.totalQuantity.subscribe(
      data =>{
        this.totalQuantity = data
      }
    );

    this.cartService.computeCartTotals();
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
    if(this.checkoutFormGroup.invalid){
      this.checkoutFormGroup.markAllAsTouched();
    }
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


  get firstName(){return this.checkoutFormGroup.get('customer.firstName');}
  get lastName(){return this.checkoutFormGroup.get('customer.lastName');}
  get email(){return this.checkoutFormGroup.get('customer.email');}

  get shippingAddressStreet(){return this.checkoutFormGroup.get('shippingAddress.street');}
  get shippingAddressCity(){return this.checkoutFormGroup.get('shippingAddress.city');}
  get shippingAddressState(){return this.checkoutFormGroup.get('shippingAddress.state');}
  get shippingAddressCountry(){return this.checkoutFormGroup.get('shippingAddress.country');}
  get shippingAddressZipCode(){return this.checkoutFormGroup.get('shippingAddress.zipCode');}

  get billingAddressStreet(){return this.checkoutFormGroup.get('billingAddress.street');}
  get billingAddressCity(){return this.checkoutFormGroup.get('billingAddress.city');}
  get billingAddressState(){return this.checkoutFormGroup.get('billingAddress.state');}
  get billingAddressCountry(){return this.checkoutFormGroup.get('billingAddress.country');}
  get billingAddressZipCode(){return this.checkoutFormGroup.get('billingAddress.zipCode');}

 //cardType nameOnCard cardNumber securityCode expirationMonth expirationYear
  get creditCardCardType(){ return this.checkoutFormGroup.get('creditCard.cardType');}
  get creditCardNameOnCard(){ return this.checkoutFormGroup.get('creditCard.nameOnCard');}
  get creditCardCardNumber(){ return this.checkoutFormGroup.get('creditCard.cardNumber');}
  get creditCardSecurityCode(){ return this.checkoutFormGroup.get('creditCard.securityCode');}
  get creditCardExpirationMonth(){ return this.checkoutFormGroup.get('creditCard.expirationMonth');}
  get creditCardExpirationYear(){ return this.checkoutFormGroup.get('creditCard.expirationYear');}


}
