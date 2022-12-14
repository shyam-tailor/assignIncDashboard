import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonServiceService } from 'src/app/common-service.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatPaginator } from '@angular/material/paginator';

@UntilDestroy()
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  taskData: any = [];
  feedbackData: any = [];
  displayedColumns: string[];
  userData: any
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isLogged: any;
  role: any;
  constructor(private observer: BreakpointObserver, private router: Router, private http: HttpClient, public commonsvc: CommonServiceService, private modalService: BsModalService) {
    this.displayedColumns = ["title", "description", "user", "feedback"]

  }

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




  getFeedbacks() {
    this.userData = localStorage.getItem('userDetails')
    this.userData = JSON.parse(this.userData)
    console.log(this.userData, typeof this.userData)
    this.commonsvc.getfeedbacks(this.userData.username).subscribe(
      (result: any) => {
        this.feedbackData = result.data;
        this.dataSource = new MatTableDataSource<any>(this.feedbackData);
        this.dataSource.paginator = this.paginator;
      },
      (error: any) => {
        this.feedbackData = [];
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }




  ngOnInit(): void {

    this.getFeedbacks();
    this.checkRole()
  }

}
