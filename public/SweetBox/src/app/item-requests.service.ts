import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Item } from './item';

@Injectable()
export class ItemRequests {

  constructor(private http: HttpClient) {}

  getAllItems() {
    return this.http.get('http://localhost:3000/api/v1/item');
  }

  getByName() {
    return this.http.get('http://localhost:3000/api/v1/item');
  }

  addItem(item: Item): Observable<Item>{
    return this.http.post<Item>('http://localhost:3000/api/v1/item', item);
  }

  updateItem(item: Item): Observable<Item>{
    return this.http.put<Item>('http://localhost:3000/api/v1/item', item);
  }

  remove() {
    return this.http.delete('http://localhost:3000/api/v1/item');
  }
}
