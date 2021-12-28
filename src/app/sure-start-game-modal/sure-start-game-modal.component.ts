import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sure-start-game-modal',
  templateUrl: './sure-start-game-modal.component.html',
  styleUrls: ['./sure-start-game-modal.component.scss']
})
export class SureStartGameModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SureStartGameModalComponent>, private router: Router) { }

  ngOnInit(): void {
  }

  onExit(): void{
    this.router.navigate(['exercises'])
    this.dialogRef.close()
  }

  onStart(): void{
    this.dialogRef.close()
  }
}
