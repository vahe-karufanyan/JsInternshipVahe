import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Item } from '../interfaces/item';


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  getByName(name: string) {
    return this.http.get<Item[]>(`http://localhost:3000/api/v1/search/${name}`);
  }
}
