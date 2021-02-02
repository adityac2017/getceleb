import { Component, OnInit } from '@angular/core';

import { LoginService } from 'src/app/services/login.service';
import { LocalStorageService } from 'angular-web-storage';
import { AppComponent } from 'src/app/app.component';
import { ApiService } from 'src/app/services/api.service';
import {UrlService} from '../../services/url.service';
declare var $: any;
import { ToastrService } from 'ngx-toastr';
import * as js from '../../../assets/js/custom';
import { Meta } from '@angular/platform-browser';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  isLogin: boolean;
  token:string;
  userId:string;
  getList:any;
  userPhone:number;
  imageUrl:string;
  userPassword:string;
  confiruserPassword:string;
  profileImage:string;
  file:string;
  isFullUrl:number;
  theIndex: number;
  getVideoList:any[]=[];
  socialShareVideo:string;
  videoUrl:string;
  flags = {
    isSubmitted: false
  };
  copyText:string;
  constructor(private localStorage: LocalStorageService,
    private loginService: LoginService,
    private api: ApiService,
    private toastr: ToastrService,
    private spinner: AppComponent,
    private url: UrlService,
    public meta: Meta,
    public title: Title
    ) { 
      this.title.setTitle('GetCeleb - Get Personalized video messages from your favorite celebrities in India')
      this.meta.updateTag({ name: 'description', content: 'GetCeleb is a platform where fans can book personalised video shoutouts/greetings/advise from their favorite celebrities, athletes, or influencers. Our mission is to create the most authentic and memorable fan experiences in the world. Gift a video message from a celebrity in India' });
    }

  ngOnInit() {

    // $(`#pause-${index}-index`).hide();
    // $(`#play-${index}-index`).show();
this.videoUrl = this.url.videoUrl;
    this.imageUrl = this.url.imageUrl;
    this.loginService.isLogin().subscribe((isLoggedIn: boolean) => {
      this.isLogin = isLoggedIn;
    })
      const localdata =   this.localStorage.get('user');
      this.token = localdata.token;
      this.userId = localdata._id;
      this.getData();
      js.playpouse();
      js.onhoverShowControlls();
      document.getElementById('closeToggle').click()
  }

  getData(){
    this.spinner.showSpinner();
    this.api.getUserProfile({userId:this.userId},this.token).subscribe((response: any) => {
     this.spinner.hideSpinner();
     if(response.success == 400) return this.showWarning(response.message)
     this.profileImage = response.user.profileImage;
     this.getList = response.user;
     this.userPhone = response.user.userPhone;
     this.getVideoList = response.user.vedio;
    //  const result = response.user.vedio;
    //  const tempArray = [];
    //  result.forEach(element => {
    //   if(element.bookingStatus == 3 && element.bookingFor != 2){
    //     tempArray.push(element);
    //   }
    //   });
    //   this.getVideoList = tempArray;
    

     this.isFullUrl = response.user.isFullUrl;
     document.getElementById('closeToggle').click()
       });
  }

  updatePass(){
    this.flags.isSubmitted = true;
  
    if(!this.userPassword){
      this.showWarning('Enter New Password')
      this.flags.isSubmitted = false;
    }  else if (!this.confiruserPassword){
      this.showWarning('Enter Confirm Password')
      this.flags.isSubmitted = false;
     }
     else if (this.userPassword != this.confiruserPassword){
      this.showWarning('New password and Confirm password not match');
      this.flags.isSubmitted = false;
     }
     else{
      this.spinner.showSpinner();
      this.api.changePassword({id:this.userId,password:this.userPassword,userType:0},this.token).subscribe((response: any) => {
       $('#pswrdModal').modal('hide');
       this.spinner.hideSpinner();
        if(response.success == 400) return this.showWarning(response.message)
        this.getList = response.user;
         });
     }
   
  }
  selectFile (e: any) {
    this.spinner.showSpinner();
    const file = e.target.files[0];
    if (file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/gif') {
      this.file = file;
      const formData = new FormData();
    if(this.file){
      formData.append('profileImage', this.file);
      }
      formData.append('userId', this.userId);
      this.api.userProfileUpdate(formData,this.token).subscribe((response: any) => {
       this.spinner.hideSpinner();
        if(response.success == 400) return this.showWarning(response.message)
        this.profileImage = response.user.profileImage;
        this.getList = response.user;
    })
    } else {
      alert('Selected file is not image.');
    }
  }
  selectImage(){
    $("#imagebutton").trigger("click");
  }
  // play(index) {
  //   $(`.btnPlay-${index}`).hide();
  //   $(`.btnPause-${index}`).show();
  //   $(`.btnPlay-${index}`).click(function(event){
  //     $(`.profile-bio-video-${index}`).trigger('play')
  //   });
  // }
  // pause(index) {
  //   $(`.btnPlay-${index}`).show();
  //   $(`.btnPause-${index}`).hide();
  //   $(`.btnPause-${index}`).click(function(event){
  //     $(`.profile-bio-video-${index}`).trigger('pause');
  //   });
  // }
  play(index) {
    $(`.btnPlay-${index}`).css("display", "none");
    $(`.btnPause-${index}`).css("display", "flex");
    // $(`.btnPlay-${index}`).click(function(event){
      $(`.profile-bio-video-${index}`).trigger('play')
    // });
  }
  pause(index) {
    $(`.btnPlay-${index}`).css("display", "flex");
    $(`.btnPause-${index}`).css("display", "none");
    // $(`.btnPause-${index}`).click(function(event){
      $(`.profile-bio-video-${index}`).trigger('pause')
    // });
  }

  openSocial(val){
this.socialShareVideo = val.vedio;
  }
 

  showSuccess(message) {
    this.toastr.success(message, 'Success');
  }
  showWarning(message) {
    this.toastr.error(message, 'Error');
  }

}
