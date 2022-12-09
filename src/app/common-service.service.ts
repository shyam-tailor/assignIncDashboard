import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  constructor(public http: HttpClient) { }

  getAllUsers() {
    const url = environment.base_url + 'getAllUsers'
    return this.http.get(url)
  }

  updateuser(payload: any, id: any) {
    const url = environment.base_url + 'updateuser';
    payload.id = id
    return this.http.post(url, payload)
  }

  adduser(payload: any) {
    const url = environment.base_url + 'registerAction'
    return this.http.post(url, payload)
  }
  getTaskDetails(username: any) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("user", username);
    const url = environment.base_url + 'getusertask/' + username
    return this.http.get(url)
  }
  getAllTaskDetails() {
    const url = environment.base_url + 'allTaskDetails'
    return this.http.get(url)
  }

  getfailedtask() {
    const url = environment.base_url + 'failedTasks'
    return this.http.get(url)
  }

  addTask(formdata: any) {
    const url = environment.base_url + 'addTask';
    return this.http.post(url, formdata)
  }

  updatetask(payload: any, id: any) {
    const url = environment.base_url + 'updateTask';
    payload.id = id
    return this.http.post(url, payload)
  }

  uploadFile(file: any) {
    const url = environment.base_url + 'upload';
    console.log(file)
    return this.http.post(url, file)
  }

  getFile(id: any) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("id", id);
    const url = environment.base_url + 'getFile/' + id;
    return this.http.get(url)
  }

  downloadFile(file: any): Observable<any> {
    const url = environment.base_url + 'download/' + file;
    return this.http.get(url, { responseType: 'blob' })
  }


  getTaskCounts() {
    const url = environment.base_url + 'taskCounts'
    return this.http.get(url)
  }

  getUsersCounts() {
    const url = environment.base_url + 'usersCounts'
    return this.http.get(url)
  }

  getFeedbackCounts() {
    const url = environment.base_url + 'getFeedbackCounts'
    return this.http.get(url)
  }

  accept_task(payload: any) {
    const url = environment.base_url + 'acceptTask'
    return this.http.post(url, payload)
  }

  getAllfeedbacks() {
    const url = environment.base_url + 'feedbackDetails'
    return this.http.get(url)
  }

  getfeedbacks(username: any) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("username", username);
    const url = environment.base_url + 'feedbackDetails/';
    return this.http.get(url, { params: queryParams })
  }

  addFeedback(payload: any) {
    const url = environment.base_url + 'addFeedback';
    return this.http.post(url, payload)
  }

  getmessages(username: any) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("username", username);
    const url = environment.base_url + 'messageDetails/' + username;
    return this.http.get(url)
  }

  getAllmessages() {
    const url = environment.base_url + 'allMessageDetails/';
    return this.http.get(url)
  }

  addMessage(payload: any, username: any) {
    payload.message_from = username;
    const url = environment.base_url + 'addMessage';
    return this.http.post(url, payload)
  }

  checkIn(payload: any) {
    const url = environment.base_url + 'checkIn';
    return this.http.post(url, payload)
  }

  checkInStatus(payload: any) {
    const url = environment.base_url + 'checkInStatus';
    return this.http.post(url, payload)
  }

  checkOut(payload: any) {
    const url = environment.base_url + 'checkOut';
    return this.http.post(url, payload)
  }
}
function responseType(url: string, responseType: any, Blob: any): Observable<HttpResponse<Blob>> {
  throw new Error('Function not implemented.');
}

