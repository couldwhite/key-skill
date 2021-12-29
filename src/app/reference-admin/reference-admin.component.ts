import { Component, OnInit } from '@angular/core';
import {NewUserModalComponent} from "../new-user-modal/new-user-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {AboutUsModalComponent} from "../about-us-modal/about-us-modal.component";

@Component({
  selector: 'app-reference-admin',
  templateUrl: './reference-admin.component.html',
  styleUrls: ['./reference-admin.component.scss']
})
export class ReferenceAdminComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  click(){
    const dialogRef = this.dialog.open(AboutUsModalComponent, {
      width: '400px',
    })
    dialogRef.afterClosed().subscribe(result => console.log(result))
  }

}
