import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Item } from '../interfaces/item';


@Injectable()
export class SearchService {

  constructor(private http: HttpClient) { }

  getByName(name: string): Observable<Item[]>{
    return this.http.get<Item[]>(`http://localhost:3000/api/v1/search/${name}`);
  }
}
