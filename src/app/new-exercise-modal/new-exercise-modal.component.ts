import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Exercise} from "../domain/exercise";
import {ExerciseService} from "../services/exercise.service";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

interface Level {
  key: number,
  value: string
}

interface Zone {
  key: number,
  value: string
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
    "name": new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15)
    ]),
    "masOfSymbols": new FormControl("", Validators.required),
    "creatingWay": new FormControl("", Validators.required),
    "length": new FormControl("", Validators.required)
  })

  constructor(public dialogRef: MatDialogRef<NewExerciseModalComponent>,
              private exerciseService: ExerciseService, public snackBar: MatSnackBar) {
  }

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

  onClose(): void {
    this.dialogRef.close();
  }

  onSave() {
    if (!this.checkNotAutoInput()) {
      this._symbols?.clearValidators();
      this._symbols?.updateValueAndValidity();
    } else {
      this._symbols?.addValidators([Validators.minLength(this._length?.value), Validators.maxLength(this._length?.value)]);
      this._symbols?.updateValueAndValidity();
    }
    if (this.myForm.valid) {
      this.exercise.maxErrors = Math.round(this.exercise.length / 10);
      this.exerciseService.addExercise(this.exercise).subscribe(() => window.location.reload());
      this.snackBar.open("Упражнение успешно добавлено", "", {
        duration: 2000,
      });
      this.dialogRef.close();
    }
  }

  displayAll(): void {
    this.display_all = true;
  }

  checkNotAutoInput(): boolean {
    return this.exercise.creatingWay == "Вручную"
  }

  get _name() {
    return this.myForm.get('name')
  }

  get _length() {
    return this.myForm.get('length')
  }

  get _zone() {
    return this.myForm.get('keyZone')
  }

  get _maxTimeKick() {
    return this.myForm.get('maxTimeKick')
  }

  get _symbols() {
    return this.myForm.get('masOfSymbols')
  }

  get _level() {
    this._length?.clearValidators();
    this._maxTimeKick?.clearValidators();
    if (this.myForm.get('levelNumber')?.value == 1) {
      this._length?.addValidators([Validators.min(40), Validators.max(60), Validators.required])
      this._length?.updateValueAndValidity();
      if (this._zone?.value?.length != 1) {
        this._zone?.setErrors({'incorrect': true});
      }
      this._maxTimeKick?.addValidators([Validators.min(1), Validators.max(4), Validators.required])
      return 1;
    } else if (this.myForm.get('levelNumber')?.value == 2) {
      this._length?.addValidators([Validators.min(61), Validators.max(80), Validators.required])
      this._length?.updateValueAndValidity();
      if (this._zone?.value?.length < 2 || this._zone?.value?.length > 3) {
        this._zone?.setErrors({'incorrect': true});
      }
      this._maxTimeKick?.addValidators([Validators.min(1), Validators.max(3), Validators.required])
      return 2;
    } else if (this.myForm.get('levelNumber')?.value == 3) {
      this._length?.addValidators([Validators.min(81), Validators.max(100), Validators.required])
      this._length?.updateValueAndValidity();
      if (this._zone?.value?.length < 3) {
        this._zone?.setErrors({'incorrect': true});
      }
      this._maxTimeKick?.addValidators([Validators.min(1), Validators.max(2), Validators.required])
      return 3;
    } else return -1;
  }

}
