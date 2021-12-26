import {Component, Injectable, OnInit} from '@angular/core';
import {
  MatKeyboardComponent,
  MatKeyboardConfig, MatKeyboardDirective, MatKeyboardKeyComponent,
  MatKeyboardModule,
  MatKeyboardService
} from "angular-onscreen-material-keyboard";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ExerciseComponent} from "../exercise/exercise.component";
import {ExerciseService} from "../services/exercise.service";


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
  providers: [ExerciseComponent],

})
@Injectable({providedIn: 'root'})
export class ExerciseProcessComponent implements OnInit {

  stateOfLetter: string = 'start';
  id: number;
  masLetters = ["А", "Б", "В", "Г", "Д", "А", "Б", "В", "Г", "Д", "А", "Б", "В", "Г", "Д", "А", "Б", "В", "Г", "Д"]

  constructor( public exercise: ExerciseComponent) {
    console.log(this.exercise.exercise)
  }

  ngOnInit(): void {

     let mainClass = this;

    document.addEventListener('keydown', function(event) {
      if(event.key.toLowerCase()==mainClass.masLetters[0].toLowerCase()){
        mainClass.masLetters = mainClass.masLetters.slice(1, mainClass.masLetters.length)
      }
    });

  }

  openKeyboard(){
  }

}
