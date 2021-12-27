import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SignUpInfo} from "../auth/signup-info";
import {AddUserService} from "../services/add_user.service";
import {ExerciseService} from "../services/exercise.service";

@Component({
  selector: 'app-delete-exercise-modal',
  templateUrl: './delete-exercise-modal.component.html',
  styleUrls: ['./delete-exercise-modal.component.scss']
})
export class DeleteExerciseModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteExerciseModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {id: number},
              private service: ExerciseService) { }

  ngOnInit(): void {
  }

  onClose(): void{
    this.dialogRef.close();
  }

  onDelete(): void{
    console.log(this.data.id)
    this.service.deleteExercise(this.data.id.toString()).subscribe(()=>{
      this.dialogRef.close();
      window.location.reload();
    })
  }
}
