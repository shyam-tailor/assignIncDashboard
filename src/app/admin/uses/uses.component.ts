import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CommonServiceService } from '../../common-service.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  constructor(public commonsvc: CommonServiceService, private modalService: BsModalService, private fb: FormBuilder) {
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
    this.getAllUsers()
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
