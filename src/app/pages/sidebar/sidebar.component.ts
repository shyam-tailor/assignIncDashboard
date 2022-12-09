import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CheckboxControlValueAccessor } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  role: any;
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(private route: Router, private observer: BreakpointObserver, private router: Router) {

  }

  logout() {
    localStorage.removeItem('isLogged');
    localStorage.removeItem('role');
    localStorage.removeItem('userDetails')
    this.route.navigate(['login']);
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

  ngOnInit(): void {
    this.checkRole();


  }

  ngAfterViewInit() {
  }

}
