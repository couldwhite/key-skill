import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Exercise} from "../domain/exercise";
import {ExerciseService} from "../services/exercise.service";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

interface Level{
  key: number, value: string
}

interface Zone{
  key: number, value: string
}

@Component({
  selector: 'app-new-exercise-modal',
  templateUrl: './new-exercise-modal.component.html',
  styleUrls: ['./new-exercise-modal.component.scss'],
  providers: [ReactiveFormsModule]
})
export class NewExerciseModalComponent implements OnInit {

  public exercise: Exercise = new Exercise();
  display_all = false;
  myForm: FormGroup = new FormGroup({
    "levelNumber": new FormControl({disabled: true}, Validators.required),
    "keyZone": new FormControl("", Validators.required),
    "maxTimeKick": new FormControl("", Validators.required),
    "maxErrors": new FormControl(""),
    "name": new FormControl("", Validators.required),
    "masOfSymbols": new FormControl("", Validators.required),
    "creatingWay": new FormControl("", Validators.required),
    "length": new FormControl("", Validators.required)
  })

  constructor(public dialogRef: MatDialogRef<NewExerciseModalComponent>,
              private exerciseService: ExerciseService) { }

  public levels: Level[] = [
    {key: 1, value: "Начальный"},
    {key: 2, value: "Средний"},
    {key: 3, value: "Продвинутый"}
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
    this.display_all = false;
  }

  onClose(): void{
    this.dialogRef.close();
  }

  onSave() {
    if (!this.checkNotAutoInput()){
      this.myForm.controls.masOfSymbols.clearValidators();
      this.myForm.controls.masOfSymbols.updateValueAndValidity();
      console.log(this.myForm)
    }
    if (this.myForm.valid){
      console.log(this.exercise)
      this.exercise.maxErrors = Math.round(this.exercise.length/10);
      this.exerciseService.addExercise(this.exercise).subscribe();
      this.dialogRef.close();
      setTimeout("window.location.reload()",100);
    }
  }

  displayAll(): void{
    this.display_all=true;
  }

  checkNotAutoInput(): boolean{
    console.log(this.exercise.creatingWay == "Вручную")
    return this.exercise.creatingWay == "Вручную"
  }

}
