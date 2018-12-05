import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserLogIn } from './userLogIn';
import { UserSignUp } from './userSignUp';

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) {}

  signUp(user: UserSignUp): Observable<UserSignUp>{
    return this.http.post<UserSignUp>('http://localhost:3000/api/v1/authorisation/signUp', user);
  }

  signIn(user: UserLogIn): Observable<UserLogIn>{
    return this.http.post<UserLogIn>('http://localhost:3000/api/v1/authorisation/logIn', user);
  }

  logOut() {
    return this.http.get('http://localhost:3000/api/v1/authorisation/logOut');
  }
}