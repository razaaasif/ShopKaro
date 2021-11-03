import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

    
  }
  

  onSubmit(){
    console.log("Handling the submit button....");
    console.log(this.checkoutFormGroup.get('customer').value);
  }

  copyShippingAddressToBillingAddress(event){
    if(event.target.checked){
      this.checkoutFormGroup.controls.billingAddress.setValue(this.checkoutFormGroup.controls.shippingAddress.value);
    }
    else{
      this.checkoutFormGroup.controls.billingAddress.reset();
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

}
