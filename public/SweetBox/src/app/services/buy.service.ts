import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class BuyService {

  constructor(private http: HttpClient) { }

  buy(token: string, email: string, id: number, price: number, quality: number, toPay?: number): Observable<any>{
    return this.http.post<any>('http://localhost:3000/api/v1/buy', { 
      token,
      email,
      id,
      price,
      quality,
      toPay
     });
  }
}
