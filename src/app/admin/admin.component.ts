import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {NewUserModalComponent} from "../new-user-modal/new-user-modal.component";
import {Exercise} from "../domain/exercise";
import {UserService} from "../services/user.service";
import {User} from "../domain/user";
import {TokenStorageService} from "../auth/token-storage.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private tokenStorage: TokenStorageService, public dialog: MatDialog, public userService: UserService) { }

  allUsers: User[] = [];
  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(response=> {
      this.allUsers = response;
    });
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

  chekAdminRole(): boolean {
    return this.tokenStorage.getAuthorities().includes('ROLE_ADMIN');
  }
}
