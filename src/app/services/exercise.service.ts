import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {AuthLoginInfo} from "../auth/login-info";
import {Observable} from "rxjs";
import {JwtResponse} from "../auth/jwt-response";
import {SignUpInfo} from "../auth/signup-info";
import {Exercise} from "../domain/exercise";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
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

  constructor(private http: HttpClient) { }
}
