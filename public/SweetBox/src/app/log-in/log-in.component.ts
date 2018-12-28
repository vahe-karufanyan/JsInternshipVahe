import { Component } from '@angular/core';
import { UserLogIn } from '../interfaces/userLogIn'
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

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
    this._authenticationService.signIn(this.credentials).subscribe(res => {
      this.router.navigateByUrl('/shop');
      console.log(res);
      localStorage.setItem('token', res.token);
      localStorage.setItem('role', res.role);
    },
    (err) => {
      alert(err);
    })
  }
};