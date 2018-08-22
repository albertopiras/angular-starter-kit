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
export class DashboardComponent implements OnInit, OnDestroy {

  public status: number;
  public totalSales: any;
  
  // Processing time
  private pollingTimeout = 3000;
  private pollerStatistics;

  // chart
  public lineChartData = [0,0];
  public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    {
      backgroundColor: '#5e9fe061',
      borderColor: '#1976d2',
    },
    { 
      backgroundColor: '#dd00313b',
      borderColor: '#dd0031',
    },
    { 
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';
  public options = {
    legend: {
      position: 'right', // just to position, in case you use it
      display: false
    }
  }

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.retrieveDashboardStatistics(false);
  }

  ngOnDestroy() {
    clearTimeout(this.pollerStatistics);
  }

  //polling home statistics
  retrieveDashboardStatistics(wait:boolean) {
    this.dashboardService.getDashboardStatistics().pipe(
      finalize(() => {
        this.pollerStatistics = setTimeout(() => {
          this.retrieveDashboardStatistics(true);
        }, !wait? 0 : this.pollingTimeout);
      }
      )
    )
      .subscribe((data) => {
        this.updateDashboard(data);
      }, (error) => {
        console.error('homecomponent error getDashboardStatistics ' + error);
      })
  }

  updateDashboard(response: any) {
    this.status = parseInt(response['data']['status']);
    this.updateChart(response['data']['sales']['list']);
    this.totalSales = response['data']['sales']['totals'];
  }

  updateChart(list: Array<any>) {
    this.lineChartData = list;
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }



}
