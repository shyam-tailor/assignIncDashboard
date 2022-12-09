import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CommonServiceService } from 'src/app/common-service.service';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  displayedColumns: any;
  taskData$!: Observable<any>;
  dataSource = new MatTableDataSource<any>();
  date: any;
  now: any;
  ViewmodalRef?: BsModalRef;
  difference: number | any;
  timeline_days!: number;
  timeline_hours!: number;
  timeline_seconds!: number;
  timeline_minute!: number;
  statusData: any;
  taskDescription: any;
  taskTitle: any;
  taskData: any = [];
  userData: any;
  totalWords: any = 0;
  totalPayment: any = 0;
  totalScore: any = 0;
  constructor(private route: Router, private http: HttpClient, public commonsvc: CommonServiceService, private modalService: BsModalService) { }



  getTask() {
    this.userData = localStorage.getItem('userDetails')
    this.userData = JSON.parse(this.userData)
    this.taskData$ = this.commonsvc.getTaskDetails(this.userData.username);
    this.taskData$.subscribe(
      (result: any) => {
        this.taskData = result.data;
        this.dataSource = new MatTableDataSource<any>(result.data);
        result.data.forEach((item: any) => {
          let currentDate = new Date();
          var deadlineDate = new Date(item.deadline)
          var Difference_In_Time = deadlineDate.getTime() - currentDate.getTime();
          var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
          var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
          item.remaingTime = Difference_In_Time.toFixed(2)
          item.button = '<button type="button" class="btn btn-primary"> Primary </button>'
          setInterval(() => {
            this.tickTock(item);
            let targetDate: any = new Date(item.deadline);
            let targetTime = targetDate.getTime()
            this.difference = targetTime - this.now;
            this.difference = this.difference / (1000 * 60 * 60 * 24);


          }, 1000);
          item.button = '<button type="button" class="btn btn-primary"> Primary </button>'
        })

        result.data.forEach((item: any) => {
          this.totalPayment = this.totalPayment + (item.cost_to_freelance * item.words)
          this.totalWords = this.totalWords + item.words
          if (item.accepted == 'Accepted') {
            this.totalScore = this.totalScore + item.score
          }
        })

      })



    // this.rowData$ = of(result.data);

  }

  tickTock(item: any) {
    this.date = new Date();
    this.now = this.date.getTime();
    item.timeline_days = Math.floor(this.difference);
    item.timeline_hours = 23 - this.date.getHours();
    item.timeline_minute = 60 - this.date.getMinutes();
    item.timeline_seconds = 60 - this.date.getSeconds();
  }


  acceptTask(index: any) {
    console.log(this.dataSource.data[index].id)
    const payload = {
      taskId: this.dataSource.data[index].id
    }

    this.commonsvc.accept_task(payload).subscribe(
      (result: any) => {
        this.getTask()
      },
      (error: any) => {

      }
    )
  }

  openModal(template: TemplateRef<any>, index: any, type: any) {
    if (type == 'viewTemplate') {
      this.taskTitle = this.taskData[index].title;
      this.taskDescription = this.taskData[index].description;
      this.ViewmodalRef = this.modalService.show(template);
    }


  }

  ngOnInit(): void {
    this.getTask()
    this.displayedColumns = [
      "title",
      "description",
      "username",
      "assigner",
      'score',
      'words',
      "deadline",
      'remaingTime',
      "accepted",
      "file",
      'viewtask',
    ]

  }







}
