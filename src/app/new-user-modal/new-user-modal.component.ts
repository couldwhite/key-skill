import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AddUserService} from "../services/add_user.service";
import {SignUpInfo} from "../auth/signup-info";


@Component({
  selector: 'app-new-user-modal',
  templateUrl: './new-user-modal.component.html',
  styleUrls: ['./new-user-modal.component.scss']
})
export class NewUserModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NewUserModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: SignUpInfo,
              private addUserService: AddUserService) { }

  ngOnInit(): void {
  }

  onClose(): void{
    this.dialogRef.close();
  }

  onSave(): void{
    this.dialogRef.close(this.data);
    console.log(this.data);
   this.addUserService.attemptAuth(this.data).subscribe();
  }
}
