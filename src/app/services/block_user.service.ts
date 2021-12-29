import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {AuthLoginInfo} from "../auth/login-info";
import {Observable, Subject} from "rxjs";
import {JwtResponse} from "../auth/jwt-response";
import {SignUpInfo} from "../auth/signup-info";
import {Exercise} from "../domain/exercise";
import {Block} from "../domain/block";
import {CheckBlock} from "../domain/check_block";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};


@Injectable({
  providedIn: 'root'
})
export class BlockService {


  private exerciseUrl = 'http://localhost:8080/api/block';

  blockUser(block: Block): Observable<Block>{
    return this.http.post<Block>(`${this.exerciseUrl}/blockUser`, block, httpOptions);
  }
  checkBlock(id: number): Observable<CheckBlock>{
    return this.http.get<CheckBlock>(`${this.exerciseUrl}/checkUserOnBlock/`, {
      params: new HttpParams().append('id', id),
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  unBlockUser(id: number): Observable<CheckBlock>{
    return this.http.post<CheckBlock>(`${this.exerciseUrl}/unblockUser/`,{}, {
      params: new HttpParams().append('id', id),
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  constructor(private http: HttpClient) { }
}
