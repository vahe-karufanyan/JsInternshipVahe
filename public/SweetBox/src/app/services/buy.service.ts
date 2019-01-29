import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class BuyService {

  constructor(private http: HttpClient) { }

  buy(): Observable<any>{
    return this.http.post<any>('http://localhost:3000/api/v1/buy', { 
      //body here
     });
  }
}
