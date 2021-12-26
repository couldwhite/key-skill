import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {AuthLoginInfo} from "../auth/login-info";
import {Observable, Subject} from "rxjs";
import {JwtResponse} from "../auth/jwt-response";
import {SignUpInfo} from "../auth/signup-info";
import {Exercise} from "../domain/exercise";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};


@Injectable({
  providedIn: 'root'
})
export class ExerciseService {


  private exerciseUrl = 'http://localhost:8080/api/exercise';

  getAllExercises(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(`${this.exerciseUrl}/getAllExercises`, httpOptions);
  }

  addExercise(exercise: Exercise): Observable<Exercise>{
    return this.http.post<Exercise>(`${this.exerciseUrl}/createExercise`, exercise, httpOptions);
  }

  getById(id: number): Observable<Exercise>{
    return this.http.get<Exercise>(`${this.exerciseUrl}/getExerciseById/`, {
      params: new HttpParams().append('id', id),
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  constructor(private http: HttpClient) { }
}
