import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {NewUserModalComponent} from "../new-user-modal/new-user-modal.component";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  username: string;
  password: string;

  openModal(): void{
    const dialogRef = this.dialog.open(NewUserModalComponent, {
      width: '400px',
      data: {password: this.password, username: this.username}
    })
    dialogRef.afterClosed().subscribe(result => console.log(result))
  }
}
