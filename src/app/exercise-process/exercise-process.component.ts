import {Component, Injectable, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ExerciseService} from "../services/exercise.service";
import {ActivatedRoute} from "@angular/router";
import {Exercise} from "../domain/exercise";
import {MatDialog} from "@angular/material/dialog";
import {ErrorExitGameModalComponent} from "../error-exit-game-modal/error-exit-game-modal.component";
import {GeneralStatisticServer} from "../services/general_statistic.server";
import {UserCardModalComponent} from "../user-card-modal/user-card-modal.component";
import {SureStartGameModalComponent} from "../sure-start-game-modal/sure-start-game-modal.component";


@Component({
  selector: 'app-exercise-process',
  animations: [
    trigger('moving_letters', [
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

  constructor(public dialogStart: MatDialog, private activateRoute: ActivatedRoute, service: ExerciseService, public dialog: MatDialog, private statService: GeneralStatisticServer) {
    this.id = activateRoute.snapshot.params['id'];
    service.getById(this.id).subscribe(el => {
      this.exercise = el;
      this.masLetters = el.masOfSymbols.split("");
    })
  }

  ngOnInit(): void {

    const dialogRef = this.dialogStart.open(SureStartGameModalComponent, {
      width: '460px',
      data: {}
    })
    dialogRef.afterClosed().subscribe();
    let mainClass = this;
    document.addEventListener('keydown', function (event) {
      if (event.key.toLowerCase() == mainClass.masLetters[0].toLowerCase()) {
        mainClass.masLetters = mainClass.masLetters.slice(1, mainClass.masLetters.length)
        console.log(mainClass.masLetters.length)
        if (mainClass.masLetters.length==0){
          mainClass.statService.addStatistic(mainClass.id.toString(), true).subscribe();
        }
      } else {
        mainClass.errorProcess++;
        if (mainClass.errorProcess == mainClass.exercise.maxErrors) {
          mainClass.statService.addStatistic(mainClass.id.toString(), false).subscribe();
          const dialogRef = mainClass.dialog.open(ErrorExitGameModalComponent, {
            width: '250px'
          })
          dialogRef.afterClosed().subscribe();
        }
      }

    });

  }

}
