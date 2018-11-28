import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Item } from './item';

@Injectable()
export class ItemRequests {

  constructor(private http: HttpClient) {}

  addItem(user: Item): Observable<Item>{
    return this.http.post<Item>('http://localhost:3000/api/v1/item', user);
  }

  updateItem(user: Item): Observable<Item>{
    return this.http.put<Item>('http://localhost:3000/api/v1/item', user);
  }

  remove() {
    return this.http.delete('http://localhost:3000/api/v1/item');
  }
}
