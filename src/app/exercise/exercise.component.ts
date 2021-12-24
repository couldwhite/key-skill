import { Component, OnInit } from '@angular/core';
import {ExerciseService} from "../services/exercise.service";
import {Exercise} from "../domain/exercise";
import {NewUserModalComponent} from "../new-user-modal/new-user-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {NewExerciseModalComponent} from "../new-exercise-modal/new-exercise-modal.component";

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss']
})



export class ExerciseComponent implements OnInit {

  public exercise: Exercise = new Exercise();

  constructor(private exerciseService: ExerciseService, public dialog: MatDialog) { }
  allExercises: Exercise[] = [];
  ngOnInit(): void {
    this.exerciseService.getAllExercises().subscribe(response=> {
      this.allExercises = response;
      console.log(response)
    });
  }

  openModal(): void{
    const dialogRef = this.dialog.open(NewExerciseModalComponent, {
      width: '500px',
      data: {levelNumber: this.exercise?.levelNumber, keyZone: this.exercise?.keyZone,
        maxTimeKick: this.exercise?.maxTimeKick, maxErrors: this.exercise?.maxErrors,
        name: this.exercise?.name,
        masOfSymbols: this.exercise?.masOfSymbols,
        creatingWay: this.exercise?.creatingWay,
        length: this.exercise?.length
        }
    })
    dialogRef.afterClosed().subscribe();
  }

  getNameOfLevel(level: number): string{
    if (level==1) return "Начальный";
    else if (level==2) return "Средний";
    else return "Продвинутый"
  }

  getFingers(fingers: number[]): string{
    let nameFingers = " ";
    for (let i = 0; i<fingers.length; i++){
      let zone = fingers[i];
      if (zone==1) {
        nameFingers+=" указательный,";
      }
      else if (zone==2) {
        nameFingers+=" средний,";
      }
      else if (zone==3) {
        nameFingers += " безымянный,";
      }
      else if (zone==4) {
        nameFingers+=" мизинец,";
      }
    }
    nameFingers+=" большой";
    return nameFingers;
  }

  openExercise(): void{

  }

}
