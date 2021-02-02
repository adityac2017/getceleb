import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  baseUrl = 'https://getceleb.in/server/api/user';
imageUrl = `https://getceleb.in/server/api/user/image/`;
videoUrl = `https://getceleb.in/server/uploads/`;

// baseUrl = 'http://13.234.186.152:3000/api/user';
// imageUrl = `http://13.234.186.152:3000/api/user/image/`;
// videoUrl = `http://13.234.186.152/uploads/`;
constructor() { }

signIn = `${this.baseUrl}/signIn`;
socialLogin = `${this.baseUrl}/socialLogin`;
signUp = `${this.baseUrl}/signUp`;
allClient = `${this.baseUrl}/allTalent`;
getTalentWebsite = `${this.baseUrl}/getTalentWebsite`;
getUserProfile = `${this.baseUrl}/getUserProfile`;
changePassword = `${this.baseUrl}/changePassword`;
userProfileUpdate = `${this.baseUrl}/userProfileUpdate`;
bookAppointment = `${this.baseUrl}/tempRequest`;
allTalentsWebsite = `${this.baseUrl}/allTalentsWebsite`;
createChecksumWeb = `${this.baseUrl}/createChecksumWeb`;
getallTalentWebsite =`${this.baseUrl}/getallTalentWebsite`;
forgetPassword =`${this.baseUrl}/forgetPassword`;
verifyOtp =`${this.baseUrl}/verifyOtp`;
newchangePassword =`${this.baseUrl}/changePassword`;
sendMailParty =`${this.baseUrl}/sendMailParty`;
allUsersByCategory =  `${this.baseUrl}/allUsersByCategory`;
}