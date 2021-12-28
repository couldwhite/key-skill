import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {SignUpInfo} from "../auth/signup-info";
import {AddUserService} from "../services/add_user.service";
import {User} from "../domain/user";
import {UserService} from "../services/user.service";
import {TokenStorageService} from "../auth/token-storage.service";
import {SureDeleteUserModalComponent} from "../sure-delete-user-modal/sure-delete-user-modal.component";

@Component({
  selector: 'app-user-card-modal',
  templateUrl: './user-card-modal.component.html',
  styleUrls: ['./user-card-modal.component.scss']
})
export class UserCardModalComponent implements OnInit {

  user: User;
  constructor(public dialogRef: MatDialogRef<UserCardModalComponent>,
              public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: { id: number },
              private service: UserService) { }

  ngOnInit(): void {
    this.service.getUserById(this.data.id).subscribe((el)=>
    {
      this.user = el
    })

  }

  onClose(): void{
    this.dialogRef.close();
  }

  onDelete(): void{
    const dialogRefuser = this.dialog.open(SureDeleteUserModalComponent, {
      width: '350px',
      data: {id: this.user.id}
    })
    dialogRefuser.afterClosed().subscribe(()=>{
      this.dialogRef.close();
      window.location.reload();
    })
  }

}
