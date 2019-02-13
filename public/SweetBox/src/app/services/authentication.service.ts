import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { User } from '../interfaces/user'
import { UserLogIn } from '../interfaces/userLogIn'
import { UserSignUp } from '../interfaces/userSignUp'

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) {}

  private url = 'http://localhost:3000/api/v1/authorisation/'

  public signUp(user: UserSignUp): Observable<User> {
    return this.http.post<User>(this.url + 'signUp', user)
  }

  public signIn(user: UserLogIn): Observable<User> {
    return this.http.post<User>(this.url + 'logIn', user)
  }

  public isLoggedIn(): boolean {
    return !!localStorage.getItem('token')
  }

  public isAdmin(): boolean {
    if (localStorage.getItem('role') === 'admin') {
      return true
    }
    return false
  }
}
