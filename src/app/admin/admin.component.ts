import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {NewUserModalComponent} from "../new-user-modal/new-user-modal.component";
import {Exercise} from "../domain/exercise";
import {UserService} from "../services/user.service";
import {User} from "../domain/user";
import {TokenStorageService} from "../auth/token-storage.service";
import {UserCardModalComponent} from "../user-card-modal/user-card-modal.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserStatisticServer} from "../services/user_statistic.service";
import {UserStatistic} from "../domain/user_statistic";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private tokenStorage: TokenStorageService, public dialog: MatDialog,
              public userService: UserService, public snackBar: MatSnackBar,
              public userStatisticServer: UserStatisticServer) { }
  searchField: string | any
  allUsers: User[] = [];

  allUsersStatistics: UserStatistic[] = [];
  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(response=> {
      this.allUsers = response;
      this.allUsers.forEach(el => {
        this.userStatisticServer.count(el.id).subscribe(response => {
          el.count = response;
          console.log(response)
        });
      })
    });

  }
  isExist: boolean;
  isShow: boolean;
  search_field: string;
  user : User;
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

  onSubmit() {
    if (this.search_field == null) {
      this.snackBar.open("Заполните поле ввода логина", "", {
        duration: 2000,
      });
    } else {
      this.userService.existById(this.search_field).subscribe((el) => {
        this.isExist = el;
        if (this.isExist) {
          this.userService.getUserByName(this.search_field).subscribe(el => {
            this.userStatisticServer.count(el.id).subscribe(response => {
              this.user = el;

              this.allUsers = [this.user];
              el.count = response;
              console.log(response)
            });

          })
        } else {
          this.snackBar.open("Пользователь не найден", "", {
            duration: 2000,
          });
        }
      })
    }

  }
  openUserCard(id: number){
    const dialogRef = this.dialog.open(UserCardModalComponent, {
      width: '700px',
      data: {id: id}
    })
    dialogRef.afterClosed().subscribe(result => console.log(result))
  }
}
