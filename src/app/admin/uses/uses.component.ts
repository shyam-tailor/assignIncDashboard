import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CommonServiceService } from '../../common-service.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-uses',
  templateUrl: './uses.component.html',
  styleUrls: ['./uses.component.scss']
})
export class UsesComponent implements OnInit {
  dataSource: any;
  displayedColumns: any;
  AddmodalRef?: BsModalRef;
  EditmodalRef?: BsModalRef;
  UsersForm: any;
  EditUserForm: FormGroup;
  roleData: any = [];
  userId: any;
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isLogged: any;
  role: any;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  constructor(private observer: BreakpointObserver, public commonsvc: CommonServiceService, public router: Router, private modalService: BsModalService, private fb: FormBuilder) {
    this.initAddUser()
    this.EditUserForm = this.fb.group({
      'username': [""],
      'firstname': [""],
      'lastname': [""],
      'password': [""],
      'dob': [new Date()],
      'role': [''],
      'score': [0],
      'cost': [0]
    });
    this.roleData = [
      { role: 'Admin', value: 'admin' },
      { role: 'Freelancer', value: 'freeelancer' },
      { role: 'Employee', value: 'employee' }
    ]
  }
  usersData: any = []

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

  initAddUser() {
    this.UsersForm = this.fb.group({
      'username': [""],
      'firstname': [""],
      'lastname': [""],
      'password': [""],
      'dob': [new Date()],
      'role': [''],
      'score': [0],
      'cost': [0]
    });
  }
  ngOnInit(): void {
    this.getAllUsers();
    this.checkRole()
  }

  getAllUsers() {
    this.commonsvc.getAllUsers().subscribe(
      (res: any) => {
        if (res.data.length > 0) {
          this.usersData = res.data;
          this.displayedColumns = Object.keys(res.data[0]).slice(1);
          this.displayedColumns.push('edit')
          console.log(this.displayedColumns)
          this.dataSource = new MatTableDataSource<any>(res.data);
          this.dataSource.paginator = this.paginator;
        }
        else {
          this.usersData = [];
          this.displayedColumns = [];
        }

      },
      (err: any) => {
        this.usersData = [];
        this.displayedColumns = [];
      }
    );
  }

  editUserModal(item: any) {
    console.log(item);
    this.userId = item.id
    let editFormObj: any;
    // this.displayedColumns.forEach((item: string) => {
    //   console.log(this.usersData[index][item]);
    //   Object.assign(editFormObj, { item: this.usersData[index][item] })
    //   console.log(editFormObj);

    // })
    this.EditUserForm.patchValue({
      'username': [item.username],
      'firstname': [item.firstname],
      'lastname': [item.lastname],
      'dob': [item.dob],
      'role': [item.role],
      'score': [item.score],
      'cost': [item.cost]
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }





  UpdateUser() {
    this.commonsvc.updateuser(this.EditUserForm.value, this.userId).subscribe(
      (result: any) => {
        console.log(result)
        this.getAllUsers();
        this.EditmodalRef?.hide()
      },
      (error: any) => {
        this.EditmodalRef?.hide()
      })
  }



  addUser() {
    this.commonsvc.adduser(this.UsersForm.value).subscribe(
      (result: any) => {
        this.getAllUsers();
        this.UsersForm.reset()
        this.AddmodalRef?.hide()

      },
      (error: any) => {
        this.AddmodalRef?.hide()
      })
  }

  openModal(template: TemplateRef<any>, index: any, role: any) {
    if (role == 'adduser') {
      this.AddmodalRef = this.modalService.show(template);
    }
    if (role == 'edituser') {
      this.EditmodalRef = this.modalService.show(template);
    }

  }

}
