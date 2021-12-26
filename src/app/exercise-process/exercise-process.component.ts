import {Component, Injectable, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ExerciseService} from "../services/exercise.service";
import {ActivatedRoute} from "@angular/router";
import {Exercise} from "../domain/exercise";


@Component({
  selector: 'app-exercise-process',
  animations: [
    trigger('moving_letters',[
      state('start', style({
        display: 'flex',
        justifyContent: 'left',
      })),
      state('end', style({
        display: 'flex',
        justifyContent: 'left '
      })),
      transition('start=>end', [
        animate(1500)
      ])
    ])
  ],
  templateUrl: './exercise-process.component.html',
  styleUrls: ['./exercise-process.component.scss'],
})
@Injectable({providedIn: 'root'})
export class ExerciseProcessComponent implements OnInit {

  stateOfLetter: string = 'start';
  id: number;
  exercise: Exercise;
  masLetters: string[] = [];
  errorProcess = 0;

  constructor(private activateRoute: ActivatedRoute, service: ExerciseService) {
    this.id = activateRoute.snapshot.params['id'];
    service.getById(this.id).subscribe(el=>{
      this.exercise=el;
      this.masLetters = el.masOfSymbols.split("");
      console.log(this.masLetters)
      console.log(el)
    })
  }

  ngOnInit(): void {

     let mainClass = this;
    document.addEventListener('keydown', function(event) {
      if(event.key.toLowerCase()==mainClass.masLetters[0].toLowerCase()){
        mainClass.masLetters = mainClass.masLetters.slice(1, mainClass.masLetters.length)
      }
      else {
        mainClass.errorProcess++;
        if (mainClass.errorProcess==mainClass.exercise.maxErrors){
          alert("Ваши попытки закончились")
        }
      }
    });

  }

}
