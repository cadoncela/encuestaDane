import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from '../models/Auth';
import { User } from '../models/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = 'http://localhost:8080/encuesta/';

  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<User[]>{
    return this.http.get<User[]>(this.apiUrl+'v1/api');
  }

  findUser(auth: Auth): Observable<User>{
    return this.http.post<User>(this.apiUrl+'v1/api', auth);
  }

  create(user: User): Observable<User>{
    return this.http.post<User>(this.apiUrl+'v1/api/create', user);
  }
}
