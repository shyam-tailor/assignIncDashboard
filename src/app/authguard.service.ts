import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NullTemplateVisitor } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService {

  constructor(private route: Router) { }

  canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('isLogged') != null && (localStorage.getItem('role') == 'employee' || localStorage.getItem('role') == 'freelancer')) {
      return true;
    }
    else {
      alert("In Else")
      this.route.navigate(['login']);
      return false;
    }
  }


}
