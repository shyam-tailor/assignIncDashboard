import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminguardService {
  role: any;
  constructor(private route: Router) { }


  canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    this.role = localStorage.getItem('role')
    if (localStorage.getItem('isLogged') != null && atob(this.role) == 'admin') {
      return true;
    }
    else {
      this.route.navigate(['login']);
      return false;
    }
  }
}
