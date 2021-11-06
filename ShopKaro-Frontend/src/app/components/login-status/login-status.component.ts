import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {

  isAuthenticated:boolean =false;
  userFullName:string;
  storage:Storage=sessionStorage;

  constructor(private oktaAuthService:OktaAuthService) { }

  ngOnInit(): void {
    //subscribe to authentication state changes
    this.oktaAuthService.$authenticationState.subscribe(
      (result) =>{
        this.isAuthenticated = result;
        this.getUserDetails();
      }
    );
  }
  getUserDetails() {
    if(this.isAuthenticated){
      //fetch the logged in user details(users' claims)
      this.oktaAuthService.getUser().then(
        (res) =>{
          this.userFullName= res.name;
          //retrieve users email from authenticated response
          const theEmail = res.email;
          //now store the email in browsers storage
          this.storage.setItem('theEmail',JSON.stringify(theEmail));

        }
      );
    }

  }
  
  logout(){
      //terminates the session with Okta and remove current the token
      this.oktaAuthService.signOut();
  }

}
