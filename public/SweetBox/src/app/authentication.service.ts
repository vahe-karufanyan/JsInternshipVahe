import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { UserLogIn } from './userLogIn';
import { UserSignUp } from './userSignUp';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) {}

  signUp(user: UserSignUp): Observable<UserSignUp>{
    return this.http.post<UserSignUp>('http://localhost:3000/api/v1/authorisation/signUp', user);
  }

  signIn(user: UserLogIn): Observable<UserLogIn>{
    return this.http.post<UserLogIn>('http://localhost:3000/api/v1/authorisation/logIn', user);
  }

  logOut() {
    return this.http.delete('http://localhost:3000/api/v1/authorisation/logOut');
  }
 
}
