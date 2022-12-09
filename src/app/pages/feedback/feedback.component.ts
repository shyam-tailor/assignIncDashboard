import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CommonServiceService } from 'src/app/common-service.service';

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
  constructor(public commonsvc: CommonServiceService) {
    this.displayedColumns = ["title", "description", "user", "feedback"]

  }



  getFeedbacks() {
    this.userData = localStorage.getItem('userDetails')
    this.userData = JSON.parse(this.userData)
    console.log(this.userData, typeof this.userData)
    this.commonsvc.getfeedbacks(this.userData.username).subscribe(
      (result: any) => {
        this.feedbackData = result.data;
        this.dataSource = new MatTableDataSource<any>(this.feedbackData)
      },
      (error: any) => {
        this.feedbackData = [];
      }
    )
  }




  ngOnInit(): void {
    this.getFeedbacks();
  }

}
