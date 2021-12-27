import {Component, OnInit} from '@angular/core';
import {ExerciseService} from "../services/exercise.service";
import {Exercise} from "../domain/exercise";
import {NewUserModalComponent} from "../new-user-modal/new-user-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {NewExerciseModalComponent} from "../new-exercise-modal/new-exercise-modal.component";
import {Router} from "@angular/router";
import {of} from "rxjs";
import {DeleteExerciseModalComponent} from "../delete-exercise-modal/delete-exercise-modal.component";
import {TokenStorageService} from "../auth/token-storage.service";

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss']
})


export class ExerciseComponent implements OnInit {

  public exercise: Exercise = new Exercise();
  public idEx: number = 0;

  chooseLevel: number[] = [];
  chooseLength: number[] = [];


  constructor(private tokenStorage: TokenStorageService, private exerciseService: ExerciseService, public dialog: MatDialog, public router: Router) {
  }

  public allExercises: Exercise[] = [];

  ngOnInit(): void {
    this.exerciseService.getAllExercises().subscribe(response => {
      this.allExercises = response;
    });

  }

  openModal(): void {
    const dialogRef = this.dialog.open(NewExerciseModalComponent, {
      width: '500px'
    })
    dialogRef.afterClosed().subscribe();
  }

  getNameOfLevel(level: number): string {
    if (level == 1) return "Начальный";
    else if (level == 2) return "Средний";
    else return "Продвинутый"
  }

  getFingers(fingers: number[]): string {
    let nameFingers = " ";
    for (let i = 0; i < fingers.length; i++) {
      let zone = fingers[i];
      if (zone == 1) {
        nameFingers += " указательный,";
      } else if (zone == 2) {
        nameFingers += " средний,";
      } else if (zone == 3) {
        nameFingers += " безымянный,";
      } else if (zone == 4) {
        nameFingers += " мизинец,";
      }
    }
    nameFingers += " большой";
    return nameFingers;
  }

  pushLevelValue(value: number) {
    if (!this.chooseLevel.includes(value)) {
      this.chooseLevel.push(value);
    } else this.chooseLevel = this.chooseLevel.filter((item) => {
      return item !== value
    })
  }

  pushLengthValue(value: number) {
    if (!this.chooseLength.includes(value)) {
      this.chooseLength.push(value);
    } else this.chooseLength = this.chooseLength.filter((item) => {
      return item !== value
    })
  }

  checkLengthValue(value: number) {
    if (this.chooseLength.length == 0) {
      return true;
    } else {
      if (value > 39 && value < 61 && this.chooseLength.includes(1)) {
        return true;
      } else if (value > 60 && value < 81 && this.chooseLength.includes(2)) {
        return true;
      } else if (value > 80 && value < 101 && this.chooseLength.includes(3)) {
        return true;
      } else return false;
    }
  }

  checkLevelValue(value: number) {
    if (this.chooseLevel.length == 0) {
      return true;
    } else if (this.chooseLevel.includes(value)) {
      return true;
    } else return false;
  }

  deleteExercise(id: number) {
    const dialogRef = this.dialog.open(DeleteExerciseModalComponent, {
      width: '400px',
      data: {id: id}
    })
    dialogRef.afterClosed().subscribe(result => console.log(result))
  }

  chekAdminRole(): boolean {
    return this.tokenStorage.getAuthorities().includes('ROLE_ADMIN');
  }
}
