import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-error-exit-game-modal',
  templateUrl: './error-exit-game-modal.component.html',
  styleUrls: ['./error-exit-game-modal.component.scss']
})
export class ErrorExitGameModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ErrorExitGameModalComponent>, private router: Router) { }

  ngOnInit(): void {
  }

  onClose(): void{
    this.dialogRef.close();
    this.router.navigate(['exercises'])
  }
}
