import { Component } from '@angular/core';
import { UserLogIn } from '../models/userLogIn'
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})

export class LogInComponent {
  credentials: UserLogIn = {
    email: '',
    password: ''
  };
  
  constructor(private _authenticationService: AuthenticationService, private router: Router) { }

  logIn(): void {
    this._authenticationService.signIn(this.credentials).subscribe(res: User => {
      this.router.navigateByUrl('/shop');
      console.log(res);
      localStorage.setItem('token', res.token);
      localStorage.setItem('email', res.email);
      localStorage.setItem('role', res.role);
    },
    (err) => {
      alert(err);
    })
  }
};