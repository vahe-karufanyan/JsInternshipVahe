import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Item } from '../interfaces/item';
import { ResponseForItem } from '../interfaces/responseForItem';

@Injectable()
export class ItemRequests {

  url: string = 'http://localhost:3000/api/v1/item';

  constructor( private http: HttpClient ) {}

  getAllItems(): Observable<ResponseForItem[]>{
    return this.http.get<ResponseForItem[]>(this.url);
  }

  getByType(type: string): Observable<ResponseForItem[]>{
    return this.http.get<ResponseForItem[]>(this.url + `/getByType/${type}`);
  }

  addItem(item: Item, token: string): Observable<ResponseForItem>{
    return this.http.post<ResponseForItem>(this.url, { item: item, token: token });
  }

  updateItem(item: Item, token: string): Observable<ResponseForItem>{
    return this.http.put<ResponseForItem>(this.url + `/${item.id}`, { item: item, token: token });
  }

  remove(id: number, token: string): Observable<ResponseForItem>{
    return this.http.request<ResponseForItem>('delete', `${this.url}/${id}`, { body: { token: token } });
  }
}