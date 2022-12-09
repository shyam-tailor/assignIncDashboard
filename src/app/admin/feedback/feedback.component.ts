import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CommonServiceService } from 'src/app/common-service.service';

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
  constructor(public commonsvc: CommonServiceService, private fb: FormBuilder, private modalService: BsModalService) {
    this.displayedColumns = ["title", "description", "user", "feedback"]
    this.FeedbackForm = this.fb.group({
      'task_id': [""],
      'feedback_title': [""],

    });
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
  }

}
