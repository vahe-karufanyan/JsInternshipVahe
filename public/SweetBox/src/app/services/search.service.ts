import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ResponseForItem } from '../interfaces/responseForItem';


@Injectable()
export class SearchService {

  constructor(private http: HttpClient) { }

  getByName(name: string): Observable<ResponseForItem[]>{
    return this.http.get<ResponseForItem[]>(`http://localhost:3000/api/v1/search/${name}`);
  }
}