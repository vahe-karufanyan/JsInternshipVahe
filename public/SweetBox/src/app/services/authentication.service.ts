import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserLogIn } from '../interfaces/userLogIn';
import { UserSignUp } from '../interfaces/userSignUp';
import { User } from '../interfaces/user';

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) {}

  url: string = 'http://localhost:3000/api/v1/authorisation/';

  signUp(user: UserSignUp): Observable<User>{
    return this.http.post<User>(this.url + 'signUp', user);
  }

  signIn(user: UserLogIn): Observable<User>{
    return this.http.post<User>(this.url + 'logIn', user);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
