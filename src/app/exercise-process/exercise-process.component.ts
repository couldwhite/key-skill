import { Component, OnInit } from '@angular/core';
import {
  MatKeyboardComponent,
  MatKeyboardConfig, MatKeyboardDirective, MatKeyboardKeyComponent,
  MatKeyboardModule,
  MatKeyboardService
} from "angular-onscreen-material-keyboard";
import {animate, state, style, transition, trigger} from "@angular/animations";


@Component({
  selector: 'app-exercise-process',
  animations: [
    trigger('moving_letters',[
      state('start', style({
        backgroungColor: 'blue',
        width: '150px',
        height: '150px'
      })),
      state('end', style({
        backgroungColor: 'red',
        width: '300px',
        height: '300px'
      })),
      transition('start=>end', [
        animate(500)
      ])
    ])
  ],
  templateUrl: './exercise-process.component.html',
  styleUrls: ['./exercise-process.component.scss'],
  providers: [MatKeyboardConfig, MatKeyboardService, MatKeyboardKeyComponent, MatKeyboardDirective],

})
export class ExerciseProcessComponent implements OnInit {

  constructor(public m: MatKeyboardConfig, public s: MatKeyboardService, public kc: MatKeyboardKeyComponent,
              public d: MatKeyboardDirective) { }

  ngOnInit(): void {

 //   this.s.open("Русский", this.m);
  }

  a(){


  }

}
