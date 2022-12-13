import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CommonServiceService } from '../../common-service.service';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ExcelServiceService } from '../../excel-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class AdminHomeComponent implements OnInit {

  file: any;
  displayedColumns: any;
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  AddmodalRef?: BsModalRef;
  editmodalRef?: BsModalRef;
  ViewmodalRef?: BsModalRef;
  items: any;
  TaskForm: FormGroup | any;
  EditTaskForm: FormGroup;
  srcResult: any;
  usersData: any
  taskDescription: any;
  taskTitle: any;
  taskData: any = [];
  date: any;
  now: any;
  difference: number | any;
  timeline_days!: number;
  timeline_hours!: number;
  timeline_seconds!: number;
  timeline_minute!: number;
  statusData: any
  taskId: any;
  searchKey: any
  constructor(private route: Router, private http: HttpClient, private excelService: ExcelServiceService, public commonsvc: CommonServiceService, private modalService: BsModalService, private fb: FormBuilder) {


    this.TaskForm = this.fb.group({
      'title': [""],
      'description': [""],
      'username': ['null'],
      'assigner': ['null'],
      'score': [0],
      'words': [0],
      'deadline': [new Date()],
      'cost_to_company': [''],
      'cost_to_freelance': [''],
      'status': ['null'],
      'file': [""],
    });

    this.EditTaskForm = this.fb.group({
      'title': [""],
      'description': [""],
      'username': ['null'],
      'assigner': ['null'],
      'score': [0],
      'words': [0],
      'deadline': [new Date()],
      'cost_to_company': [''],
      'cost_to_freelance': [''],
      'status': ['null'],
      'file': [""],
    });

    this.statusData = [
      { status: 'To Do', value: 'to_do' },
      { status: 'Pending', value: 'pending' },
      { status: 'Completed', value: 'completed' },
      { status: 'Failed', value: 'failed' }
    ]
  }


  ngAfterViewInit() {
    this.onGridReady();
  }

  onGridReady() {
    this.rowData$ = this.commonsvc.getAllTaskDetails();
    this.rowData$.subscribe(
      (result) => {
        // result.newdata = result.data.forEach((item: any, index: any) => {
        //   item.sno = index + 1
        // })
        if (result.data.length > 0) {
          this.taskData = result.data;
          this.dataSource = new MatTableDataSource<any>(result.data)
          this.dataSource.paginator = this.paginator;

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
          })
        }
        else {
          this.taskData = [];
        }


        // setInterval(() => {
        //   this.tickTock();
        //   let targetTime = his.targetDate.getTime()
        //   this.difference = this.targetTime - this.now;
        //   this.difference = this.difference / (1000 * 60 * 60 * 24);

        //   !isNaN(this.days.nativeElement.innerText)
        //     ? (this.days.nativeElement.innerText = Math.floor(this.difference))
        //     : (this.days.nativeElement.innerHTML = `<img src="https://i.gifer.com/VAyR.gif" />`);
        // }, 1000);



        // this.rowData$ = of(result.data);

      }
    )
  }



  logout() {
    localStorage.removeItem('isLogged');
    this.route.navigate(['login']);
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

  onFileSelected(event: any) {
    const inputNode: any = document.querySelector('#file');
    this.file = event.target.files[0]
    console.log(this.file)
    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
      };

      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }

  addTask() {
    let formdata = new FormData();
    console.log(this.TaskForm.value)
    formdata.append('file', this.file)

    this.commonsvc.addTask(this.TaskForm.value).subscribe(
      (result: any) => {
        console.log(result)
        this.onGridReady();
        this.AddmodalRef?.hide()
      },
      (error: any) => {
        console.log(error);
        this.AddmodalRef?.hide()
      })

    this.commonsvc.uploadFile(formdata).subscribe(
      (result: any) => {
        console.log(result)
      },
      (error: any) => {
        console.log(error)
      })
  }

  downloadFile(id: any) {
    this.commonsvc.getFile(id).subscribe(
      (result: any) => {
        console.log(result)
        this.commonsvc.downloadFile(result.data[0].filename).subscribe(
          (response: any) => {
            let downloadURL = window.URL.createObjectURL(response);
            saveAs(downloadURL)
            // let blob: any = new Blob(['C:\Users\Shyam\Downloads'], { type: 'text/plain; charset=utf-8' });
            // // const url = window.URL.createObjectURL(blob);
            // //window.open(url);
            // //window.location.href = response.url;
            // fileSaver.saveAs(blob, 'employees.json');
          },
          (error: any) => {
            console.log(error)
          })
      },
      (error: any) => {
        console.log(error)
      })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editTaskModal(item: any) {
    this.taskId = item.id
    this.EditTaskForm.patchValue({
      'title': [item.title],
      'description': [item.description],
      'username': [item.username],
      'assigner': [item.assigner],
      'score': [item.score],
      'words': [item.words],
      'deadline': [item.deadline],
      'cost_to_company': [item.cost_to_company],
      'cost_to_freelance': [item.cost_to_freelance],
      'status': [item.status],
      'file': [item.file]
    })
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.taskData, 'sample');
  }

  editTask() {
    this.commonsvc.updatetask(this.EditTaskForm.value, this.taskId).subscribe(
      (result: any) => {
        console.log(result)
        this.onGridReady();
        this.editmodalRef?.hide()
      },
      (error: any) => {
        this.editmodalRef?.hide();
      })
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
        this.onGridReady()
      },
      (error: any) => {

      }
    )
  }

  ngOnInit(): void {
    // this.onGridReady()
    this.getAllUsers();
    this.displayedColumns = [
      "title",
      "description",
      "username",
      "assigner",
      'score',
      'words',
      'cost_to_freelance',
      'cost_to_company',
      "deadline",
      'remaingTime',
      "accepted",
      'viewtask',
      'edittask',
      'file'
    ]
    // array.forEach((item) => {
    //   this.columnDefs.push({ field: item })
    // })



  }

  openModal(template: TemplateRef<any>, index: any, type: any) {
    console.log(template)
    if (type == 'addTemplate') {
      this.AddmodalRef = this.modalService.show(template);
    }

    if (type == 'viewTemplate') {
      this.taskTitle = this.taskData[index].title;
      this.taskDescription = this.taskData[index].description;
      this.ViewmodalRef = this.modalService.show(template);
    }

    if (type == 'editTemplate') {
      this.editmodalRef = this.modalService.show(template);
    }
  }

  getTaskCountdown(task: any): Observable<string> {
    return new Observable(observable => {

      let countDown: string;
      const countDownDate: number = new Date(task.deadline).getTime();
      console.log(countDownDate)
      const x = setInterval(() => {
        const now = new Date().getTime();
        // Find the distance between now and the count down date
        const distance = countDownDate - now;
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        countDown = days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's ';
        observable.next(countDown);

        // If the count down is finished, write some text
        if (distance < 0) {
          clearInterval(x);
          countDown = 'ALREADY EXPIRED';
          observable.next(countDown);

          //observable.complete();
        }
      }, 5000);

    });
  }

  // Data that gets displayed in the grid
  public rowData$!: Observable<any>;


}
