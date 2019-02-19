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

  public reset(email: string, newDebt: number): Observable<number> {
    return this.http.put<number>(this._url + email, { newDebt })
  }

  public resetAll(emails: string[]): Observable<string> {
    return this.http.post<string>(this._url, { emails })
  }
}
