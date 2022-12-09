import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../../common-service.service';


export interface CountsInterface {
  tasks: 0,
  users: 0,
  feedbacks: 0
}
@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.scss']
})
export class DasboardComponent implements OnInit {
  isshow!: boolean;
  totalTasks: any = 0;
  totalUsers: any = 0;
  totalFeedbacks: any = 0;
  totalFailed: any = 0
  constructor(public commonsvc: CommonServiceService) { }
  username: any;
  countsObj!: CountsInterface;
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
  }

}
