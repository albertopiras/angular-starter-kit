import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Chart from 'chart.js'
import { DashboardService } from './dashboard.service';

import { interval, Observable } from 'rxjs';
import { timer } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { timeout, delay } from 'rxjs/operators';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class  DashboardComponent implements OnInit, OnDestroy {

  // Processing time
  public status: number;

  private pollingTimeout = 3000;
  private pollerStatistics;

  // Success percentage
  public successPercentage;

  // Doughnut
  public doughnutChartLabels: string[] = ['cars in success', 'cars in error'];
  public doughnutChartType: string = 'doughnut';
  public doughnutChartData: number[] = [0, 0];
  public doughnutChartColors = [
    {
      backgroundColor: [
        "#4CAF50",
        "#FFA726"
      ],
      hoverBorderColor: [
        "#1B5E20",
        "#EF6C00"
      ]
    }
  ];
  public options = {
    legend: {
      position: 'right', // just to position, in case you use it
      display: false
    }
  }

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.retrieveDashboardStatistics();
  }

  ngOnDestroy() {
    clearTimeout(this.pollerStatistics);
  }

  //polling home statistics
  retrieveDashboardStatistics() {
    this.dashboardService.getDashboardStatistics().pipe(
      finalize(() => {
        this.pollerStatistics = setTimeout(() => {
          this.retrieveDashboardStatistics();
        }, this.pollingTimeout);
      }
      )
    )
      .subscribe((data) => {
        this.updateDashboard(data);
      }, (error) => {
        console.error('homecomponent error getDashboardStatistics ' + error);
      })
  }


  updateDashboard(data: any) {
    this.status = parseInt(data['data']['status']);
    this.updateChart(data['data']['total_cars'], data['data']['failed_cars']);
  }

  updateChart(total: number, failed: number) {
    const successCars = total - failed;
    this.doughnutChartData = [successCars, failed];
    this.successPercentage = this.getSuccessPercentage(total, successCars);
  }

  getSuccessPercentage(total: number, success: number) {
    return ((100 * success) / total).toFixed(2);
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
