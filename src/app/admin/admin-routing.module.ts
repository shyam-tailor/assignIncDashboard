import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './home/home.component';
import { AuthguardService as AuthGuard } from '../authguard.service';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'task_list',
        component: AdminHomeComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
