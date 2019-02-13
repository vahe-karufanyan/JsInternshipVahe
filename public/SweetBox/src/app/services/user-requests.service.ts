import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { UserData } from '../interfaces/userData'

@Injectable()
export class UserRequestsService {

  constructor(private http: HttpClient) {}

  private _url = 'http://localhost:3000/api/v1/users/'

  public getAllUsers(): Observable<UserData[]> {
    return this.http.get<UserData[]>(this._url)
  }

}
