import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {GeneralStatistic} from "../domain/general_statistic";
import {UserStatistic} from "../domain/user_statistic";
import {User} from "../domain/user";

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
}
