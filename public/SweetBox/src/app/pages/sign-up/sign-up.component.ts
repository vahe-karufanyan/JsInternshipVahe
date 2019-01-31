import { Component } from '@angular/core';
import { UserSignUp } from '../../interfaces/userSignUp'
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  public credentials: UserSignUp = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  constructor(private _authenticationService: AuthenticationService, private router: Router) { }

  public register(): void {    
    this._authenticationService.signUp(this.credentials).subscribe((res: User) => {
      localStorage.setItem('toPay', res.toPay.toString());
      localStorage.setItem('email', res.email);
      localStorage.setItem('token', res.token);
      localStorage.setItem('role', res.role);
      this.router.navigateByUrl('');
    },
    err => {
      alert(err);
    })
  }
}