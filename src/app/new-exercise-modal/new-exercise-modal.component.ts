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

  display_all = false;
  myForm: FormGroup = new FormGroup({
    "levelNumber": new FormControl("", Validators.required),
    "keyZone": new FormControl("", Validators.required),
    "maxTimeKick": new FormControl("", Validators.required),
    "maxErrors": new FormControl("", Validators.required),
    "name": new FormControl("", Validators.required),
    "masOfSymbols": new FormControl("", Validators.required),
    "creatingWay": new FormControl("", Validators.required),
    "length": new FormControl("", Validators.required)
  })

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
    this.display_all = false;
  }

  onClose(): void{
    this.dialogRef.close();
  }

  onSave(): boolean{
    this.validateFields();
    this.dialogRef.close();
    this.data.maxErrors = Math.round(this.data.length/10);
    this.data.masOfSymbols = "";
    this.exerciseService.addExercise(this.data).subscribe();
    setTimeout("window.location.reload()",10);
    return true;
  }

  displayAll(): void{
    this.display_all=true;
  }

  validateFields(){
    if (isNaN(this.data.length))
      console.log("Пусто")
  }

}
