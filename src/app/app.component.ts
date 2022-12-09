
import * as Chart from 'chart.js';

import { Observable } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CheckboxControlValueAccessor } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'nlp';
  isLogged: any;

  constructor(private observer: BreakpointObserver, private router: Router) {
    this.isLogged = localStorage.getItem('isLogged')
  }



}

