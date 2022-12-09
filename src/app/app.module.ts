import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthguardService as AuthGuard } from './authguard.service';
import { AgGridModule } from 'ag-grid-angular';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DasboardComponent } from './admin/dasboard/dasboard.component';
import { HeaderComponent } from './pages/header/header.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { AddTaskComponent } from './pages/add-task/add-task.component'
import { ModalModule } from 'ngx-bootstrap/modal';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { AdminHomeComponent } from './admin/home/home.component';
import { MatTableModule } from '@angular/material/table';
import { AdminFeedbackComponent } from './admin/feedback/feedback.component';
import { FeedbackComponent } from './pages/feedback/feedback.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { UsesComponent } from './admin/uses/uses.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './pages/footer/footer.component';
import { AdminMessagesComponent } from './admin/messages/messages.component';
import { ExcelServiceService } from './excel-service.service';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    FeedbackComponent,
    AdminHomeComponent,
    AdminFeedbackComponent,
    AdminMessagesComponent,
    DasboardComponent,
    HeaderComponent,
    SidebarComponent,
    AddTaskComponent,
    MessagesComponent,
    UsesComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    HttpClientModule,
    AgGridModule,
    PopoverModule.forRoot(),
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    MatSelectModule,
    MatTableModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
  ],
  providers: [AuthGuard, ExcelServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }