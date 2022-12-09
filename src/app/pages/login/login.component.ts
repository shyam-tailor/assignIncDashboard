import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: any;
  password: any;
  loginMessage: any;
  constructor(private http: HttpClient, private route: Router) { }
  login() {
    var url = "http://localhost:3000/loginAction"
    var body = {
      'username': this.username,
      'password': this.password,
    }
    this.http.post(url, body).subscribe((data: any) => {
      console.warn(data)
      if (data.code == 200) {
        this.loginMessage = ""
        localStorage.setItem('isLogged', 'true')
        localStorage.setItem('userDetails', JSON.stringify(data.data))

        if (data.data.role == 'Employee') {
          localStorage.setItem('role', 'employee')
          this.route.navigate(['/tasks'])
        }
        if (data.data.role == 'Admin') {

          localStorage.setItem('role', btoa('admin'))
          this.route.navigate(['/admin/dashboard'])
        }

      }
      else {
        this.loginMessage = data.message
      }
    })
  }

  ngOnInit(): void {
  }

}
