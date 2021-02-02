import { Component, OnInit } from '@angular/core';

import { LocalStorageService } from 'angular-web-storage';
import { AppComponent } from 'src/app/app.component';
import { ApiService } from 'src/app/services/api.service';
import { UrlService } from '../../services/url.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
import * as js from '../../../assets/js/custom';
import { LoginService } from 'src/app/services/login.service';
import { Meta } from '@angular/platform-browser';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-clientprofile',
  templateUrl: './clientprofile.component.html',
  styleUrls: ['./clientprofile.component.scss']
})
export class ClientprofileComponent implements OnInit {
  isLogin: boolean;
  userId: string;
  token: string;
  getList: any[] = [];
  imageUrl: string;
  getListVideos: any[] = []
  countvideos: number;
  clientId: string;
  userIds: string;
  bookingAmount:number;
  clientName:string;
  myName: string;
  theirName: string;
  description: string;
  myName1: string;
  videoUrl: string;
  description1: string;
  flags = {
    isSubmitted: false
  };
  createChecksum: any[] = [];
  getListTag: [];
  campaignType:number=0;
  socialShareVideo:string;
  MID: string;
  ORDER_ID: string;
  CUST_ID: string;
  INDUSTRY_TYPE_ID: string;
  CHANNEL_ID: string;
  TXN_AMOUNT: string;
  WEBSITE: string;
  CALLBACK_URL: string;
  CHECKSUMHASH: string;
  showCountDownTime:string;
  campaignImage:string;
  campaignDesc:string;
  getClientData:any;
  countTicket:number=1;
  priceTypeData:number=1;
  constructor(private api: ApiService,
    private activatedRoute: ActivatedRoute,
    private localStorage: LocalStorageService,
    private spinner: AppComponent,
    private toastr: ToastrService,
    private loginService: LoginService,
    private url: UrlService,
    public meta: Meta,
    public title: Title
  ) {
    // this.meta.removeTag("property='og:description'")
    // this.meta.addTag({ name: 'description', content: 'How to use Angular 4 meta service' });
    // this.meta.addTag({ name: 'author', content: 'talkingdotnet' });
    // this.meta.addTag({ name: 'keywords', content: 'Angular, Meta Service' });
  }

  ngOnInit() {
    js.mini();
    js.taba();
    js.playv();
    if(location.search.indexOf('r') < 0){
      var hash = window.location.hash;
      var loc = window.location.href.replace(hash, '');
      loc += (loc.indexOf('?') < 0? '?' : '&') + 'r';
      window.location.href = loc + hash;
  }
    this.videoUrl = this.url.videoUrl;
    this.imageUrl = this.url.imageUrl;
    const localdata = this.localStorage.get('user');
    if (localdata) {
      this.userIds = localdata.id;
      this.token = localdata.token;
    }
    this.loginService.isLogin().subscribe((isLoggedIn: any) => {
      this.isLogin = isLoggedIn.isLogin;
    })
    this.activatedRoute.params.subscribe((params: any) => {
      this.userId = params.userId;
    });
    js.playpouse();
    this.loginService.isLogin().subscribe((isLoggedIn: any) => {
      this.isLogin = isLoggedIn.isLogin;
      if(this.isLogin == true){
        const userData = isLoggedIn.user;
        this.userIds = userData.id;
        this.token = userData.token;
      }
    })
    // js.safariVideo();
    // this.userId = this.localStorage.get('clientId');
    this.getData();
  }


  getData() {
    this.spinner.showSpinner();
    this.api.getTalentWebsite({ clientId: this.userId }).subscribe((response: any) => {
      this.spinner.hideSpinner();
      if (response.success == 400) return this.showWarning(response.message);
      this.getList = [response.client];
      this.campaignType = response.client.campaignType;
      this.getClientData = response.client
      this.priceType(1);
      $('#showCountDownTime').html("<b>Oops!! Contest has ended</b>");
      if(this.campaignType == 1){
      this.campaignImage = response.client.campaignImage
      this.campaignDesc = response.client.campaignDesc
        if(response.client.campaignTime){
          this.countDownTimer(response.client.campaignTime)
    
        }
      }
    

      const result = response.client.vedio;
      const tempArray = [];
      result.forEach(element => {
        if (element.bookingStatus == 3 && element.bookingFor != 2) {
          tempArray.push(element);
        }
      });
      this.getListVideos = tempArray;
      // this.getListVideos =response.client.vedio;
      const tagsData = [];
      response.client.tag.forEach(ele => {
        tagsData.push(ele)
      });
      this.title.setTitle(`GetCeleb - Book a personalised video from ${response.client.clientName} on GetCeleb`)
      this.meta.updateTag({ name: 'description', content: `Now book a personalised video shoutouts/greetings/advise from  ${response.client.clientName ? response.client.clientName : ''} influencers.  ${response.client.clientName ? response.client.clientName : ''} is a Celebrity and is famous as ${response.client.title ? response.client.title : ''} ${response.client.clientName ? response.client.clientName : ''} is ` + tagsData.toString() + ` Book a gift video message from a celebrity in India on GetCeleb now.` });
      this.getListTag = response.client.tag;
    });
  }

  bookClient(val) {
    if(this.userIds){
    this.spinner.showSpinner();
    this.clientName = val.clientName;
    // this.bookingAmount = val.vedioPrice;
    this.clientId = val._id;
    this.api.createChecksumWeb({ totalAmount: this.bookingAmount }, this.token).subscribe((response: any) => {
      this.spinner.hideSpinner();
      if (response.success == 400) return this.showWarning(response.message);
      this.MID = response.MID;
      this.ORDER_ID = response.ORDER_ID;
      this.CUST_ID = response.CUST_ID;
      this.INDUSTRY_TYPE_ID = response.INDUSTRY_TYPE_ID;
      this.CHANNEL_ID = response.CHANNEL_ID;
      this.TXN_AMOUNT = response.TXN_AMOUNT;
      this.WEBSITE = response.WEBSITE;
      this.CALLBACK_URL = response.CALLBACK_URL;
      this.CHECKSUMHASH = response.CHECKSUMHASH;
    });
  }
  }

  someOneElse() {
    this.flags.isSubmitted = true;
    if (!this.myName) {
      this.showWarning('Enter My Name Field')
      this.flags.isSubmitted = false;
    }
    else if (!this.theirName) {
      this.showWarning('Enter Their Name Field')
      this.flags.isSubmitted = false;
    }
    else if (!this.description) {
      this.showWarning('Enter Description')
      this.flags.isSubmitted = false;
    }
    else {
      if(this.userIds && this.ORDER_ID){
        $('#paytmform').submit();
        this.spinner.showSpinner();
        this.api.bookAppointment({ bookingFor: 0, myName: this.myName, theirName: this.theirName, description: this.description, bookingAmount: this.bookingAmount, clientId: this.clientId, userId: this.userIds, paytmOrderId: this.ORDER_ID }, this.token).subscribe((response: any) => {
          $('#bookClientModal').modal('hide');
          this.spinner.hideSpinner();
          if (response.success == 400) return this.showWarning(response.message);
          this.myName = '';
          this.theirName = '';
          this.description = '';
        });
      }
  
    }
  }

  mySelf() {
    this.flags.isSubmitted = true;
    if (!this.myName1) {
      this.showWarning('Enter My Name Field')
      this.flags.isSubmitted = false;
    }
    else if (!this.description1) {
      this.showWarning('Enter Description')
      this.flags.isSubmitted = false;
    }
    else {
      if(this.userIds && this.ORDER_ID){
      $('#paytmform').submit();
      this.spinner.showSpinner();
      this.api.bookAppointment({ bookingFor: 0, myName: this.myName1, description: this.description1, bookingAmount: this.bookingAmount, clientId: this.clientId, userId: this.userIds, paytmOrderId: this.ORDER_ID }, this.token).subscribe((response: any) => {
        $('#bookClientModal').modal('hide');
        this.spinner.hideSpinner();
        if (response.success == 400) return this.showWarning(response.message);
        this.myName1 = '';
        this.description1 = '';
      });
    }
    }
  }

  testFun() {
    $('#bookClientModal').modal('hide');
  }

  play(index) {
    $(`.btnPlay-${index}`).css("display", "none");

    $(`.btnPause-${index}`).css("display", "flex");
    // $(`.btnPlay-${index}`).click(function(event){
    $(`.profile-bio-video-${index}`).trigger('play')
    // });
  }
  pause(index) {
    $(`.btnPlay-${index}`).show();
    $(`.btnPause-${index}`).hide();
    // $(`.btnPause-${index}`).click(function(event){
    $(`.profile-bio-video-${index}`).trigger('pause')
    // });
  }

  openSocial(val) {
    this.socialShareVideo = `https://getceleb.in/celeb/${val.instagramId}`;
  }
  addId(val) {
    this.localStorage.set('videoclientIdLoc', val);
  }

  countDownTimer(timeData) {

    if (timeData) {
      const date = timeData.split(' ')[0];
      const year = date.split('-')[0]
      const month = date.split('-')[1]
      const days = date.split('-')[2]
      const time = timeData.split(' ')[1];
      const ampm = timeData.split(' ')[2];

      if (month == '01') {
        var getMonth = 'January';
      }
      else if (month == '02') {
        var getMonth = 'February';
      }
      else if (month == '03') {
        var getMonth = 'March';
      }
      else if (month == '04') {
        var getMonth = 'April';
      }
      else if (month == '05') {
        var getMonth = 'May';
      }
      else if (month == '06') {
        var getMonth = 'June';
      }
      else if (month == '07') {
        var getMonth = 'July';
      }
      else if (month == '08') {
        var getMonth = 'August';
      }
      else if (month == '09') {
        var getMonth = 'September';
      }
      else if (month == '10') {
        var getMonth = 'October';
      }
      else if (month == '11') {
        var getMonth = 'November';
      }
      else if (month == '12') {
        var getMonth = 'December';
      }


      const sendTime = `${getMonth}, ${days}, ${year} ${time} ${ampm}`
      var countDownDate = new Date(sendTime).getTime();
      var x = setInterval(function () {
        var now = new Date().getTime();
        var distance = countDownDate - now;
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        this.showCountDownTime = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

        if (distance > 0) {
          $('#showCountDownTime').html(`<b>${this.showCountDownTime}</b>`);
        }
        if (distance < 0) {
          clearInterval(x);
          $('#showCountDownTime').html("<b>Oops!! Contest has ended</b>");
        }
      }, 1000);
    }

//       const second = 1000,
//   minute = second * 60,
//   hour = minute * 60,
//   day = hour * 24;

// let countDown = new Date('Sep 30, 2020 00:00:00').getTime(),
// x = setInterval(function() {    

//   let now = new Date().getTime(),
//       distance = countDown - now;

//       var days = Math.floor(distance / (day));
//       var hours = Math.floor((distance % (day)) / (hour));
//       var minutes= Math.floor((distance % (hour)) / (minute));
//       var seconds = Math.floor((distance % (minute)) / second);
//     this.showCountDownTime = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

// }, second)
  }
  priceType(val){
    this.priceTypeData = val;
    if(val == 1){
      this.countTicket = 1;
      this.bookingAmount = this.getClientData.vedioPrice * val;
    }else{
      this.bookingAmount = this.getClientData.vedioPrice * 10;
    }

  }
  minus() {
    if (this.countTicket > 1) {
      this.countTicket -= 1;
      this.bookingAmount -= this.getClientData.vedioPrice;
    }

  }
  plus() {
    this.countTicket += 1;
    this.bookingAmount += this.getClientData.vedioPrice;
  }


  showSuccess(message) {
    this.toastr.success(message, 'Success');
  }
  showWarning(message) {
    this.toastr.error(message, 'Error');
  }

}
