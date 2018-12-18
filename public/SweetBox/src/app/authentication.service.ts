import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserLogIn } from './models/userLogIn';
import { UserSignUp } from './models/userSignUp';
import { User } from './models/user';

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) {}

  signUp(user: UserSignUp): Observable<User>{
    return this.http.post<User>('http://localhost:3000/api/v1/authorisation/signUp', user);
  }

  signIn(user: UserLogIn): Observable<User>{
    return this.http.post<User>('http://localhost:3000/api/v1/authorisation/logIn', user);
  }

  logOut() {
    return this.http.get('http://localhost:3000/api/v1/authorisation/logOut');
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }
}
