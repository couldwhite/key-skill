import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-sure-delete-user-modal',
  templateUrl: './sure-delete-user-modal.component.html',
  styleUrls: ['./sure-delete-user-modal.component.scss']
})
export class SureDeleteUserModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SureDeleteUserModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { id: number },
              private service: UserService) { }

  ngOnInit(): void {
  }

  onClose(): void{
    this.dialogRef.close();
  }

  onDelete(): void{
    this.service.deleteUser(this.data.id.toString()).subscribe();
    this.dialogRef.close();
  }
}
