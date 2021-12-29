import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {GeneralStatistic} from "../domain/general_statistic";
import {UserStatistic} from "../domain/user_statistic";
import {User} from "../domain/user";
import {Exercise} from "../domain/exercise";
import {SignUpInfo} from "../auth/signup-info";
import {JwtResponse} from "../auth/jwt-response";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class UserStatisticServer {

  private statisticUrl = 'http://localhost:8080/api/statistic';

  constructor(private http: HttpClient) { }

  getAllUserStatistics(id: number): Observable<UserStatistic[]> {
    return this.http.get<UserStatistic[]>(`${this.statisticUrl}/getAllUserStatistic`, {
      params: new HttpParams().append('id', id),
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  addStatistic(id: string, flag: boolean): Observable<string>{
    return this.http.post<string>(`${this.statisticUrl}/changeNumberOfAttempts/`,{}, {
      params: new HttpParams().appendAll({'flag': flag, 'id' : id}),
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  count(id: number): Observable<number>{
    return this.http.get<number>(`${this.statisticUrl}/count/`, {
      params: new HttpParams().append('id', id),
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  addUserStat(credentials: UserStatistic): Observable<UserStatistic> {
    return this.http.post<UserStatistic>(`${this.statisticUrl}/addUserStatistic`, credentials, httpOptions);
  }
}
