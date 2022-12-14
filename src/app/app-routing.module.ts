import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './authentication/register/register.component';
import { LoginComponent } from './authentication/login/login.component';
import { AuthguardService as AuthGuard } from './authguard.service';
import { AdminguardService as AdminGuard } from './adminguard.service';
import { DasboardComponent } from './admin/dasboard/dasboard.component';
import { AdminHomeComponent } from './admin/home/home.component';
import { AdminFeedbackComponent } from './admin/feedback/feedback.component';
import { FeedbackComponent } from './pages/feedback/feedback.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { UsesComponent } from './admin/uses/uses.component';
import { AdminMessagesComponent } from './admin/messages/messages.component';
import { AppComponent } from './app.component';
const routes: Routes = [

  {
    path: '',
    component: LoginComponent,
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)

  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'tasks',
    component: HomeComponent,
    canActivate: [AuthGuard]

  },
  {
    path: 'feedback',
    component: FeedbackComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'messages',
    component: MessagesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/alltask',
    component: AdminHomeComponent,
    canActivate: [AdminGuard]


  },
  {
    path: 'admin/feedback',
    component: AdminFeedbackComponent,
    canActivate: [AdminGuard]


  },
  {
    path: 'admin/dashboard',
    component: DasboardComponent,
    canActivate: [AdminGuard]

  },
  {
    path: 'admin/users',
    component: UsesComponent,
    canActivate: [AdminGuard]

  },
  {
    path: 'admin/messages',
    component: AdminMessagesComponent,
    canActivate: [AdminGuard]

  }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

})
export class AppRoutingModule { }
