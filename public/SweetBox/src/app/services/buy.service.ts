import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Shopping } from '../interfaces/shopping';
import { idCount } from '../interfaces/idCount';


@Injectable()
export class BuyService {

  constructor(private http: HttpClient) { }

  buy(token: string, email: string, id: number, quality: number, toPay: number): Observable<any>{
    return this.http.post<any>('http://localhost:3000/api/v1/buy', { 
      token,
      email,
      id,
      quality,
      toPay
     });
  }

  buyAll(token: string, email: string, idCount: idCount[], toPay: number): Observable<any>{
    return this.http.post<any>('http://localhost:3000/api/v1/buy/buyAll', {
      idCount,
      email,
      toPay,
      token
     });
  }

}
