import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Buy } from '../interfaces/buy'
import { IdCount } from '../interfaces/idCount'


@Injectable()
export class BuyService {

  constructor(private http: HttpClient) { }

  private _url = 'http://localhost:3000/api/v1/buy'

  public buy(token: string, email: string, id: number, quantity: number, toPay: number): Observable<Buy> {
    return this.http.post<Buy>(this._url, {
      token,
      email,
      id,
      quantity,
      toPay
     })
  }

  public buyAll(token: string, email: string, idCount: IdCount[], toPay: number): Observable<Buy> {
    return this.http.post<Buy>(this._url + '/buyAll', {
      idCount,
      email,
      toPay,
      token
     })
  }

}
