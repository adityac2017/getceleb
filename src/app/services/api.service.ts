import { Injectable } from '@angular/core';
import { UrlService } from './url.service';

import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  post(url:string, body:any, token:any) {
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token || ''
      })
    };
    return this.http.post(url, body, headers);
  }
  get(url:string, token:any) {
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token || ''
      })
    };
    return this.http.get(url, headers);
  }
  multipart(url:string, body:any, token:any) {
    const headers = {
      headers: new HttpHeaders({
        'Authorization': token || ''
      })
    };
    return this.http.post(url, body, headers);
  }
  
  constructor(private url: UrlService, private http: HttpClient) { }
  signIn(body: any) {
    return this.http.post(this.url.signIn, body);
  }
  socialLogin(body: any) {
    return this.http.post(this.url.socialLogin, body);
  }
  signUp(body: any) {
    return  this.http.post(this.url.signUp, body);
  }
  getallTalentWebsite() {
    return  this.http.get(this.url.getallTalentWebsite);
  }
  getTalentWebsite(body: any) {
    return  this.http.post(this.url.getTalentWebsite, body);
  }
  getUserProfile(body: any, token:any) {
    return  this.post(this.url.getUserProfile, body,token);
  }
  changePassword(body: any, token:any) {
    return  this.post(this.url.changePassword, body,token);
  }
  userProfileUpdate(body: any, token:any) {
    return  this.multipart(this.url.userProfileUpdate, body,token);
  }
  bookAppointment(body: any, token:any) {
    return  this.post(this.url.bookAppointment, body,token);
  }
  allTalentsWebsite() {
    return  this.http.get(this.url.allTalentsWebsite);
  }
  createChecksumWeb(body: any, token:any) {
    return  this.post(this.url.createChecksumWeb, body,token);
  }
  forgetPassword(body: any) {
    return  this.http.post(this.url.forgetPassword, body);
  }
  verifyOtp(body: any) {
    return  this.http.post(this.url.verifyOtp, body);
  }
  newchangePassword(body: any) {
    return  this.http.post(this.url.changePassword, body);
  }
  sendMailParty(body: any) {
    return  this.http.post(this.url.sendMailParty, body);
  }


  allUsersByCategory() {
    return  this.http.get(this.url.allUsersByCategory);
  }
  
  
  

}
