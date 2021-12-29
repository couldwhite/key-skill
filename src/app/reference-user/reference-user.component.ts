import { Component, OnInit } from '@angular/core';
import {AboutUsModalComponent} from "../about-us-modal/about-us-modal.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-reference-user',
  templateUrl: './reference-user.component.html',
  styleUrls: ['./reference-user.component.scss']
})
export class ReferenceUserComponent implements OnInit {

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
