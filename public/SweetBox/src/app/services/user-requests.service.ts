import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserData } from '../interfaces/userData';

@Injectable()
export class UserRequestsService {

  constructor(private http: HttpClient) {}

  url: string = 'http://localhost:3000/api/v1/users/';

  getAllUsers(): Observable<UserData[]>{
    return this.http.get<UserData[]>(this.url);
  }

}
