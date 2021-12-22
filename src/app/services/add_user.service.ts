import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {AuthLoginInfo} from "../auth/login-info";
import {Observable} from "rxjs";
import {JwtResponse} from "../auth/jwt-response";
import {SignUpInfo} from "../auth/signup-info";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AddUserService {

  private loginUrl = 'http://localhost:8080/api/auth/signup';

  attemptAuth(credentials: SignUpInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
  }

  constructor(private http: HttpClient) { }
}
