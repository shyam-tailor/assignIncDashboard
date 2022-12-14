import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isLogged: string | null;
  role: any;

  constructor(private observer: BreakpointObserver, private router: Router) {
    this.isLogged = localStorage.getItem('isLogged')
  }

  ngOnInit() {

  }



}
