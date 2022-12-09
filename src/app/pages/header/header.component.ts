import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from 'src/app/common-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public commonsvc: CommonServiceService) { }
  userData: any = [];
  profilehtml: string = `<div>
                <h5 class="profile_username" style="font-size: 14px">Shyam Tailor</h5>
                <h6 class="profile_desig" style="font-size: 12px"> Web Developer </h6>
                <span class="profile_no" style="font-size: 10px">  6350605937 </span>
                          </div>`
  checkin: boolean = true;

  ngOnInit(): void {
    this.checkInStatus()
    this.userData = localStorage.getItem('userDetails')
    this.userData = JSON.parse(this.userData);
    this.profilehtml = `<div>
                <h5 class="profile_username" style="font-size: 14px">${this.userData.firstname} ${this.userData.lastname}</h5>
                <h6 class="profile_desig" style="font-size: 12px"> ${this.userData.username} </h6>
                <span class="profile_no" style="font-size: 10px">  6350605937 </span>
                          </div>`
  }

  checkIn() {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    let payload = {
      date: date,
      checkIn: time
    }
    this.commonsvc.checkIn(payload).subscribe(
      (result: any) => {
        this.checkin = false
      },
      (error: any) => {
        this.checkin = true
      }
    )
  }

  checkOut() {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let payload = {
      date: date,
      checkout: time
    }
    this.commonsvc.checkOut(payload).subscribe(
      (result: any) => {
        this.checkin = true
      },
      (error: any) => {
        this.checkin = false
      }
    )
  }


  checkInStatus() {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let payload = {
      date: date
    }
    this.commonsvc.checkInStatus(payload).subscribe(
      (result: any) => {
        console.log(result)
        if (result.data[0].checkIn != null) {
          this.checkin = false
        }
        else {
          this.checkin = true
        }

      },
      (error: any) => {
        console.log(error)
      }
    )
  }


}
