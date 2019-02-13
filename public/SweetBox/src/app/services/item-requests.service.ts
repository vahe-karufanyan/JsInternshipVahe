import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Item } from '../interfaces/item'
import { ResponseForItem } from '../interfaces/responseForItem'

@Injectable()
export class ItemRequests {

  constructor( private http: HttpClient ) {}

  private _url = 'http://localhost:3000/api/v1/item'

  public getAllItems(): Observable<ResponseForItem[]> {
    return this.http.get<ResponseForItem[]>(this._url)
  }

  public getByType(type: string): Observable<ResponseForItem[]> {
    return this.http.get<ResponseForItem[]>(this._url + `/getByType/${type}`)
  }

  public addItem(item: Item, token: string): Observable<ResponseForItem> {
    return this.http.post<ResponseForItem>(this._url, { item: item, token: token })

  }

  public updateItem(item: Item, token: string): Observable<ResponseForItem> {
    return this.http.put<ResponseForItem>(this._url + `/${item.id}`, { item: item, token: token })
  }

  public remove(id: number, token: string): Observable<ResponseForItem> {
    return this.http.request<ResponseForItem>('delete', `${this._url}/${id}`, { body: { token: token } })
  }
}
