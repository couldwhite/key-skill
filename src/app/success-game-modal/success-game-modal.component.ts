import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-success-game-modal',
  templateUrl: './success-game-modal.component.html',
  styleUrls: ['./success-game-modal.component.scss']
})
export class SuccessGameModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SuccessGameModalComponent>, private router: Router) { }

  ngOnInit(): void {
  }

  onClose(): void{
    this.dialogRef.close();
    this.router.navigate(['exercises'])
  }

}
