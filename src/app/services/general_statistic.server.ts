import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {GeneralStatistic} from "../domain/general_statistic";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class GeneralStatisticServer {

  private statisticUrl = 'http://localhost:8080/api/statistic';

  constructor(private http: HttpClient) { }

  getAllGeneralStatistics(): Observable<GeneralStatistic[]> {
    return this.http.get<GeneralStatistic[]>(`${this.statisticUrl}/getAllGeneralStatistics`, httpOptions);
  }
}
