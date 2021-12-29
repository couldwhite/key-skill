import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {User} from "../domain/user";
import {UserService} from "../services/user.service";
import {SureDeleteUserModalComponent} from "../sure-delete-user-modal/sure-delete-user-modal.component";
import {UserStatisticServer} from "../services/user_statistic.service";
import {UserStatistic} from "../domain/user_statistic";
import {ViewChild } from "@angular/core";
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid
} from "ng-apexcharts";
import {BlockUserModalComponent} from "../block-user-modal/block-user-modal.component";
import {BlockService} from "../services/block_user.service";
import {MatSnackBar} from "@angular/material/snack-bar";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};
@Component({
  selector: 'app-user-card-modal',
  templateUrl: './user-card-modal.component.html',
  styleUrls: ['./user-card-modal.component.scss']
})
export class UserCardModalComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  isBlocked: boolean;
  public chartOptions: Partial<ChartOptions> | any;
  public allUserStatistics: UserStatistic[] = [];
  public blocked: string;
  public dates: String[] = [];
  public avarage_speeds: number[] = [];
  user: User;

  constructor(public dialogRef: MatDialogRef<UserCardModalComponent>,
              public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: { id: number },
              private service: UserService,
              private userStatisticServer: UserStatisticServer, private blockService: BlockService, public snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.service.getUserById(this.data.id).subscribe((el) => {
      this.user = el
    })
    //TODO если раскомментить, будет выводится на карточку, на прототипах нет
    this.blockService.checkBlock(this.data.id).subscribe(el => {
      if (el.checkBlock) {
        this.blocked = "заблокирован";
        this.isBlocked = true;
      } else {
        this.blocked = "незаблокирован";
      }
    })
    this.userStatisticServer.getAllUserStatistics(this.data.id).subscribe(response => {
      this.allUserStatistics = response;
      this.allUserStatistics.forEach(el => this.dates.push(el.execution_date))
      this.allUserStatistics.forEach(el => this.avarage_speeds.push(el.average_speed))
      this.showDiagram()
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }
  onBlock(): void {
    const dialogRefuser = this.dialog.open(BlockUserModalComponent, {
      width: '350px',
      data: {id: this.user.id}
    })
    dialogRefuser.afterClosed().subscribe(() => {
      this.dialogRef.close();
      window.location.reload();
    })
  }
  onUnBlock() {
    this.blockService.unBlockUser(this.data.id).subscribe();
    this.snackBar.open("Пользователь успешно разблокирован", "", {
      duration: 2000,
      panelClass: ["my-snack-bar"]
    });
    setTimeout("window.location.reload()",2000);

  }
  onDelete(): void {
    const dialogRefuser = this.dialog.open(SureDeleteUserModalComponent, {
      width: '350px',
      data: {id: this.user.id}
    })
    dialogRefuser.afterClosed().subscribe(() => {
      this.dialogRef.close();
      window.location.reload();
    })
  }
  showDiagram (){
    this.chartOptions = {
      series: [
        {
          name: "Средняя скорость",
          data: this.avarage_speeds
        }
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: "График средней скорости",
        align: "center"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: this.dates
      }
    };
  }
}
