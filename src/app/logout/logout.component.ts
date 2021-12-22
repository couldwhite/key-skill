import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {TokenStorageService} from "../auth/token-storage.service";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<LogoutComponent>,
              private token: TokenStorageService) { }

  ngOnInit(): void {
  }

  onClose(): void{
    this.dialogRef.close();
  }

  onExit(): void{
    this.token.saveToken("");
    window.location.reload();
  }
}
