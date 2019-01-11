import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Item } from '../interfaces/item';

@Injectable()
export class ItemRequests {

  url: string = 'http://localhost:3000/api/v1/item';

  constructor(private http: HttpClient) {}

  getAllItems() {
    return this.http.get<Item[]>(this.url);
  }

  getByName(name: string) {
    return this.http.get<Item[]>(`http://localhost:3000/api/v1/search/${name}`);
  }

  getByType(type: string) {
    return this.http.get<Item[]>(this.url + `/getByType/${type}`);
  }

  addItem(item: Item): Observable<Item>{
    return this.http.post<Item>(this.url, item);
  }

  // updateItem(item: Item): Observable<Item>{
  //   return this.http.put<Item>('http://localhost:3000/api/v1/item', item);
  // }

  // remove() {
  //   return this.http.delete('http://localhost:3000/api/v1/item');
  // }
}