import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SignUpInfo} from "../auth/signup-info";
import {AddUserService} from "../services/add_user.service";
import {Exercise} from "../domain/exercise";
import {ExerciseService} from "../services/exercise.service";

interface Level{
  key: number, value: string
}

interface Zone{
  key: number, value: string
}

@Component({
  selector: 'app-new-exercise-modal',
  templateUrl: './new-exercise-modal.component.html',
  styleUrls: ['./new-exercise-modal.component.scss']
})
export class NewExerciseModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NewExerciseModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Exercise,
              private exerciseService: ExerciseService) { }

  public levels: Level[] = [
    {key: 1, value: "Начальный"},
    {key: 2, value: "Средний"},
    {key: 2, value: "Продвинутый"}
  ]


  public zoneList: Zone[] = [
    {key: 1, value: "1 зона (АПМИКЕ РОТЬИГ)"},
    {key: 2, value: "2 зона (ВСУ ЛБШ)"},
    {key: 3, value: "3 зона (ЫУЦ ДЮЩ)"},
    {key: 4, value: "4 зона (ФЯЙЁ ЖЭЗХЪ)"}
    ]

  public types: string[] = [
    "Автоматически",
    "Вручную"
  ]

  ngOnInit(): void {

  }

  onClose(): void{
    this.dialogRef.close();
  }

  onSave(): void{
    this.dialogRef.close();
    this.data.maxErrors = Math.round(this.data.length/10);
    this.data.masOfSymbols = "";
    console.log(this.data);
    this.exerciseService.addExercise(this.data).subscribe();
    window.location.reload();
  }
}
