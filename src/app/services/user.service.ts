import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from "../domain/user";
import {Exercise} from "../domain/exercise";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private userUrl = 'http://localhost:8080/api/user';

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.userUrl}/getAllUsers`, httpOptions);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.userUrl}/getUserById`, {
      params: new HttpParams().append('id', id),
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  getUserByName(name: string): Observable<User> {
    return this.http.get<User>(`${this.userUrl}/getUserByName`, {
      params: new HttpParams().append('name', name),
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  deleteUser(id: string){
    return this.http.post<string>(`${this.userUrl}/deleteUser/`,{}, {
      params: new HttpParams().append('id', id),
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

}
