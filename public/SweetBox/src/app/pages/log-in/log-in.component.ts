import { Component } from '@angular/core';
import { UserLogIn } from '../../interfaces/userLogIn'
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';

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

  public logIn(): void {
    this._authenticationService.signIn(this.credentials).subscribe((res: User) => {
      localStorage.setItem('toPay', res.toPay.toString());
      localStorage.setItem('email', res.email);
      localStorage.setItem('token', res.token);
      localStorage.setItem('role', res.role);
      this.router.navigateByUrl('');
      console.log(res);
    },
    (err) => {
      alert(err);
    })
  }
};