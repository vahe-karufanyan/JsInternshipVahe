import { Component } from '@angular/core';
import { UserSignUp } from '../../interfaces/userSignUp'
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

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

  register(): void {    
    this._authenticationService.signUp(this.credentials).subscribe(res => {  //Arsenin harcnel .first()-y
      this.router.navigateByUrl('');
      localStorage.setItem('token', res.token);
      localStorage.setItem('role', res.role);
    },
    err => {
      alert(err);
    })
  }
}