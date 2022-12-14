import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  username: any;
  firstname: any;
  lastname: any;
  dob: any;
  password: any;
  role: any;
  signupMessage: any;

  constructor(private http: HttpClient, private route: Router) { }

  register() {
    var url = "http://localhost:3000/registerAction"
    var body = {
      'username': this.username,
      'password': this.password,
      'firstname': this.firstname,
      'lastname': this.lastname,
      'dob': this.dob,
      'role': this.role
    }
    this.http.post(url, body).subscribe((data: any) => {
      if (data.code == 200) {
        console.warn(data)
        this.signupMessage = ""
        this.route.navigate(['login'])
      }
      else {
        this.signupMessage = data.message
      }
    })
  }

  ngOnInit(): void {
  }

}
