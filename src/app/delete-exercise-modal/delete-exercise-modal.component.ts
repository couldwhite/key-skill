import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SignUpInfo} from "../auth/signup-info";
import {AddUserService} from "../services/add_user.service";

@Component({
  selector: 'app-delete-exercise-modal',
  templateUrl: './delete-exercise-modal.component.html',
  styleUrls: ['./delete-exercise-modal.component.scss']
})
export class DeleteExerciseModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteExerciseModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: SignUpInfo) { }

  ngOnInit(): void {
  }

  onClose(): void{
    this.dialogRef.close();
  }
}
