import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonServiceService } from '../../common-service.service';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';


export interface CountsInterface {
  tasks: 0,
  users: 0,
  feedbacks: 0
}
@UntilDestroy()
@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.scss']
})
export class DasboardComponent implements OnInit, AfterViewInit {
  isshow!: boolean;
  totalTasks: any = 0;
  totalUsers: any = 0;
  totalFeedbacks: any = 0;
  totalFailed: any = 0

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isLogged: any;
  role: any;
  constructor(private observer: BreakpointObserver, private router: Router, public commonsvc: CommonServiceService) { }

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1), untilDestroyed(this))
      .subscribe((res: any) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });

    this.router.events
      .pipe(
        untilDestroyed(this),
        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        if (this.sidenav.mode === 'over') {
          this.sidenav.close();
        }
      });
  }

  logout() {
    localStorage.removeItem('isLogged');
    localStorage.removeItem('role');
    localStorage.removeItem('userDetails')
    this.router.navigate(['login']);
  }

  checkRole() {
    this.role = localStorage.getItem('role')
    if (this.role == 'employee') {
      this.role = 'not_admin'
    }
    if (atob(this.role) == 'admin') {
      this.role = 'admin'
    }
  }
  username: any;
  countsObj!: CountsInterface;


  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'],
    datasets: [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Completed' },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'Failed' }
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };


  // Pie
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels = [['Failed'], ['Completed'], ['Pending']];
  public pieChartDatasets = [{
    data: [300, 500, 100]
  }];
  public pieChartLegend = true;
  public pieChartPlugins = [];
  getCounts() {
    this.commonsvc.getTaskCounts().subscribe(
      (result: any) => {
        if (result.data.length > 0) {
          this.totalTasks = result.data[0].titles;
        }
        else {
          this.totalTasks = 0
        }
      },
      (error) => {
        this.totalTasks = 0
      }
    )
    this.commonsvc.getUsersCounts().subscribe(
      (result: any) => {
        if (result.data.length > 0) {
          this.totalUsers = result.data[0].totalUsers
        }
        else {
          this.totalUsers = 0
        }
      },
      (error) => {
        this.totalUsers = 0
      }
    )
    this.commonsvc.getFeedbackCounts().subscribe(
      (result: any) => {
        if (result.data.length > 0) {
          this.totalFeedbacks = result.data[0].totlFeedback;
        }
        else {
          this.totalFeedbacks = 0;
        }
      },
      (error) => {
        this.totalFeedbacks = 0;
      }
    )

    this.commonsvc.getfailedtask().subscribe(
      (result: any) => {
        if (result.data.length > 0) {
          this.totalFailed = result.data[0].totalFailed;
        }
        else {
          this.totalFailed = 0;
        }
      },
      (error) => {
        this.totalFailed = 0;
      }
    )
  }

  ngOnInit(): void {
    this.getCounts()
    this.checkRole()
  }

}
