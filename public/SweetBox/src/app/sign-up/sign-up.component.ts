import { Component } from '@angular/core';
import { UserSignUp } from '../userSignUp'
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})

export class SignUpComponent {
  credentials: UserSignUp = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  constructor(private _authenticationService: AuthenticationService, private router: Router) { }

  register() {    
    this._authenticationService.signUp(this.credentials).subscribe(res => {
      this.router.navigateByUrl('/shop');
      console.log(res);
    },
    err => {
      console.error(err);
    })
  }
}