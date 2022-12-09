import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CommonServiceService } from '../../common-service.service';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class AdminMessagesComponent implements OnInit {

  messageData: any = [];
  displayedColumns: string[];
  userData: any;
  MessageForm: FormGroup;
  dataSource = new MatTableDataSource<any>();
  AddMessageModalRef?: BsModalRef;
  usersData: any = [];
  constructor(public commonsvc: CommonServiceService, private fb: FormBuilder, private modalService: BsModalService) {
    this.displayedColumns = ["message", "message_from"];
    this.MessageForm = this.fb.group({
      'message_to': [""],
      'message': [""],

    });

    this.userData = localStorage.getItem('userDetails')
    this.userData = JSON.parse(this.userData)

  }

  getAllUsers() {
    this.commonsvc.getAllUsers().subscribe(
      (res: any) => {
        this.usersData = res.data;
        console.log(this.usersData)
      },
      (err: any) => {
        this.usersData = [];
      }
    );
  }


  addMessage() {

    this.commonsvc.addMessage(this.MessageForm.value, this.userData.username).subscribe(
      (result: any) => {
        this.getMessages();
        this.AddMessageModalRef?.hide()
      },
      (error: any) => {
        this.getMessages();
        this.AddMessageModalRef?.hide()
      }
    )
  }

  getMessages() {
    this.commonsvc.getAllmessages().subscribe(
      (result: any) => {
        this.messageData = result.data;
        this.dataSource = new MatTableDataSource<any>(this.messageData)
      },
      (error: any) => {
        this.messageData = [];
      }
    )
  }


  openModal(template: TemplateRef<any>) {
    this.AddMessageModalRef = this.modalService.show(template);
  }

  ngOnInit(): void {
    this.getAllUsers();
    this.getMessages();
  }

}
