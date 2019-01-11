import { Component } from '@angular/core';
import { UserSignUp } from '../../interfaces/userSignUp'
import { AuthenticationService } from '../../services/authentication.service';
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
      localStorage.setItem('token', res.token);
      localStorage.setItem('role', res.role);
    },
    err => {
      alert(err);
    })
  }
}