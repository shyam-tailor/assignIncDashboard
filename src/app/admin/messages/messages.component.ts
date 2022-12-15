import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CommonServiceService } from '../../common-service.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
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
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isLogged: any;
  role: any;
  constructor(private observer: BreakpointObserver, public router: Router, public commonsvc: CommonServiceService, private fb: FormBuilder, private modalService: BsModalService) {
    this.displayedColumns = ["message", "message_from"];
    this.MessageForm = this.fb.group({
      'message_to': [""],
      'message': [""],

    });

    this.userData = localStorage.getItem('userDetails')
    this.userData = JSON.parse(this.userData)

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
    this.checkRole();
  }

}
