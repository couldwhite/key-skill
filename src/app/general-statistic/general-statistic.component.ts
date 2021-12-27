import {Component, OnInit} from '@angular/core';
import {GeneralStatisticServer} from "../services/general_statistic.server";
import {GeneralStatistic} from "../domain/general_statistic";

import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {  ViewChild } from "@angular/core";
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexResponsive,
  ApexXAxis,
  ApexLegend,
  ApexFill
} from "ng-apexcharts";
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  legend: ApexLegend;
  fill: ApexFill;
};
@Component({
  selector: 'app-general-statistic',
  templateUrl: './general-statistic.component.html',
  styleUrls: ['./general-statistic.component.scss']
})
export class GeneralStatisticComponent implements OnInit {
  public general_statistic: GeneralStatistic = new GeneralStatistic();
  public allGeneralStatistics: GeneralStatistic[] = [];
  public mapped : any
  public difficultyLevels: String[] = [];
  public names: String[] = [];
  public successfulAttempts: number[] = [];
  public unsuccessfulAttempts: number[] = [];
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions> | any;
  constructor(private generalStatisticService: GeneralStatisticServer, public dialog: MatDialog, public router: Router) {
  }


  ngOnInit(): void {
    this.generalStatisticService.getAllGeneralStatistics().subscribe(response => {
      this.allGeneralStatistics = response;
      this.allGeneralStatistics.forEach(el=>this.difficultyLevels.push(el.difficultyLevel))
      this.allGeneralStatistics.forEach(el=>this.names.push(el.name))
      this.allGeneralStatistics.forEach(el=>this.successfulAttempts.push(el.successfulAttempts))
      this.allGeneralStatistics.forEach(el=>this.unsuccessfulAttempts.push(el.unsuccessfulAttempts))
      this.showDiagram()
    });

  }
  showDiagram() {
    this.chartOptions = {
      series: [
        {
          name: "Количество успешных попыток",
          data: this.successfulAttempts
        },
        {
          name: "Количество неуспешных попыток",
          data: this.unsuccessfulAttempts
        }
      ],
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
        }
      },
      responsive: [
        {
          breakpoint: 680,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0
            }
          }
        }
      ],
      plotOptions: {
        bar: {
          horizontal: false
        }
      },
      xaxis: {
        type: "category",
        categories: this.names
      },
      legend: {
        position: "top",
        offsetY: 20
      },
      fill: {
        opacity: 1
      }
    };
  }
}
