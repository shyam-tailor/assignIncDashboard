import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CommonServiceService } from 'src/app/common-service.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class AdminFeedbackComponent implements OnInit {
  taskData: any = [];
  feedbackData: any = [];
  displayedColumns: string[];
  FeedbackForm: FormGroup
  dataSource = new MatTableDataSource<any>();
  AddFeedbackModalRef?: BsModalRef;

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isLogged: any;
  role: any;
  constructor(private observer: BreakpointObserver, private fb: FormBuilder, private modalService: BsModalService, private router: Router, public commonsvc: CommonServiceService) {
    this.displayedColumns = ["title", "description", "user", "feedback"]
    this.FeedbackForm = this.fb.group({
      'task_id': [""],
      'feedback_title': [""],

    });
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


  getAllTasks() {
    this.commonsvc.getAllTaskDetails().subscribe(
      (result: any) => {
        this.taskData = result.data;
      },
      (error: any) => {
        this.taskData = [];
      }
    )
  }

  getAllFeedback() {
    this.commonsvc.getAllfeedbacks().subscribe(
      (result: any) => {
        this.feedbackData = result.data;
        this.dataSource = new MatTableDataSource<any>(this.feedbackData)
      },
      (error: any) => {
        this.feedbackData = [];
      }
    )
  }

  addFeedback() {
    this.commonsvc.addFeedback(this.FeedbackForm.value).subscribe(
      (result: any) => {
        this.getAllFeedback();
      },
      (error: any) => {
        console.log(error)
      })
  }

  openModal(template: TemplateRef<any>) {
    this.AddFeedbackModalRef = this.modalService.show(template);
  }


  ngOnInit(): void {
    this.getAllFeedback();
    this.getAllTasks();
    this.checkRole()
  }

}
