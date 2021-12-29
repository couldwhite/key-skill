import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {UserService} from "../services/user.service";
import {UserStatisticServer} from "../services/user_statistic.service";
import {ChartComponent} from "ng-apexcharts";
import {UserStatistic} from "../domain/user_statistic";
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid
} from "ng-apexcharts";
import {TokenStorageService} from "../auth/token-storage.service";
import {User} from "../domain/user";

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
  selector: 'app-user-statistic',
  templateUrl: './user-statistic.component.html',
  styleUrls: ['./user-statistic.component.scss']
})
export class UserStatisticComponent implements OnInit {
  public user : User;
  public id : number;
  public username: string;
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions> | any;
  public allUserStatistics: UserStatistic[] = [];
  public dates: String[] = [];
  public avarage_speeds: number[] = [];
  constructor(private tokenStorage: TokenStorageService,
              private service: UserService,
              private userStatisticServer: UserStatisticServer) { }

  ngOnInit(): void {
    this.username = this.tokenStorage.getUsername();
    console.log(this.username)
    this.service.getUserByName(this.username).subscribe((el) => {
      this.id = el.id
      console.log(this.id)
      this.userStatisticServer.getAllUserStatistics(this.id).subscribe(response => {
        this.allUserStatistics = response;
        this.allUserStatistics.forEach(el => this.dates.push(el.execution_date))
        console.log(this.dates)
        this.allUserStatistics.forEach(el => this.avarage_speeds.push(el.average_speed))
        this.showDiagram()
      });
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
