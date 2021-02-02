import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { signup } from 'src/app/requests/signup';
import { login } from 'src/app/requests/login';
import { AppComponent } from 'src/app/app.component';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
import * as js from '../../../assets/js/custom';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';
import { LoginService } from 'src/app/services/login.service';

import { FacebookLoginProvider, GoogleLoginProvider, AuthService } from "angularx-social-login";
@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.scss']
})
export class ModalsComponent implements OnInit {
  signup = new signup;
  loginBody = new login;
  flags = {
    isSubmitted: false,
    forgotPass: true
  };
  sendemail: string;
  userIdByRes: string;
  password: string;
  otpnumber: string;
  checkemail: boolean;
  clientIdLoc: string;
  userType: number;
  constructor(protected api: ApiService,
    private spinner: AppComponent,
    private localStorage: LocalStorageService,
    private router: Router,
    private toastr: ToastrService,
    private loginService: LoginService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.clientIdLoc = this.localStorage.get('clientIdLoc');
    js.enterNumber();
    this.clear()
    $('.sendOtpform').hide();
    $('.newpassword').hide();
  
  }

  signUp() {
    const numcount = this.signup.userPhone;
    this.flags.isSubmitted = true;
    this.checkemail = this.confirmEmail(this.signup.userEmail);
    if (this.checkemail == false) {
      this.showWarning('Enter Correct Email')
      this.flags.isSubmitted = false;
    } else if (!this.signup.userName) {
      this.showWarning('Enter Your Name')
      this.flags.isSubmitted = false;
    }
    else if (!this.signup.userPhone) {
      this.showWarning('Enter Your Phone')
      this.flags.isSubmitted = false;
    }
    else if (numcount.toString().length < 10) {
      this.showWarning('Enter 10 Digit Mobile Number')
      this.flags.isSubmitted = false;
    }
    else if (!this.signup.userPassword) {
      this.showWarning('Enter Your Password')
      this.flags.isSubmitted = false;
    }
    else {
      this.spinner.showSpinner();
      this.api.signUp(this.signup).subscribe((response: any) => {
        this.spinner.hideSpinner();
        if (response.success == 400) return this.showWarning(response.message);
        $('#loginModal').modal('hide');
        $('.navbar-toggler').trigger('click');
        this.localStorage.set('user', response.user);
        // this.router.navigateByUrl('/browse');
        this.loginService.setValue({ isLogin: true, user: response.user });
        this.signup = new signup;
        this.flags.isSubmitted = false;
        this.signup = new signup;
        this.showSuccess(response.message);
      });
    }

  }

  login() {
    this.flags.isSubmitted = true;
    if (!this.loginBody.userPhone) {
      this.showWarning('Enter Your Phone')
      this.flags.isSubmitted = false;
    }
    else if (!this.loginBody.userPassword) {
      this.showWarning('Enter Your Password')
      this.flags.isSubmitted = false;
    }
    else {
      this.loginBody.userType = 0;
      this.spinner.showSpinner();
      this.api.signIn(this.loginBody).subscribe((response: any) => {

        this.spinner.hideSpinner();
        if (response.success == 400) return this.showWarning(response.message);
        this.flags.isSubmitted = false;
        $('.navbar-toggler').trigger('click');
        $('#loginModal').modal('hide');
        this.localStorage.set('user', response.user);
        this.clientIdLoc = this.localStorage.get('clientIdLoc');
        // if (this.clientIdLoc) {
        //   this.router.navigateByUrl(`/clientprofile/${this.clientIdLoc}`);
        //   this.localStorage.remove('clientIdLoc');
        // } else {
        //   this.router.navigateByUrl('/browse');
        // }
        this.loginService.setValue({ isLogin: true, user: response.user });
        this.signup = new signup;
        this.flags.isSubmitted = false;
      });
    }
  }


  async signInViaFb() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(user => {
      if (!user.email) {
        this.router.navigateByUrl('/');
      }
      this.spinner.showSpinner();
      this.flags.isSubmitted = true;
      this.api.socialLogin({ userEmail: user.email, socialId: user.id, userName: user.name, profileImage: user.facebook.picture.data.url }).subscribe((response: any) => {
        this.spinner.hideSpinner();
        this.flags.isSubmitted = false;
        if (response.success == 400) return this.showWarning(response.message);
        $('.navbar-toggler').trigger('click');
        $('#loginModal').modal('hide');
        response.user.rememberThis = 0;
        this.localStorage.set('user', response.user);
        this.clientIdLoc = this.localStorage.get('clientIdLoc');
        // if (this.clientIdLoc) {
        //   this.router.navigateByUrl(`/clientprofile/${this.clientIdLoc}`);
        //   this.localStorage.remove('clientIdLoc');
        // } else {
        //   this.router.navigateByUrl('/browse');
        // }
        this.loginService.setValue({ isLogin: true, user: response.user });
      })
    })
  }


  googleSignIn(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(user => {
      this.spinner.showSpinner();
      this.flags.isSubmitted = true;
      this.api.socialLogin({ userEmail: user.email, socialId: user.id, userName: user.name, profileImage: user.photoUrl }).subscribe((response: any) => {
        this.spinner.hideSpinner();
        this.flags.isSubmitted = false;
        if (response.success == 400) return this.showWarning(response.message);
        $('.navbar-toggler').trigger('click');
        $('#loginModal').modal('hide');
        response.user.rememberThis = 0;
        this.localStorage.set('user', response.user);
        this.clientIdLoc = this.localStorage.get('clientIdLoc');
        // if (this.clientIdLoc) {
        //   this.router.navigateByUrl(`/clientprofile/${this.clientIdLoc}`);
        //   this.localStorage.remove('clientIdLoc');
        // } else {
        //   this.router.navigateByUrl('/browse');
        // }
        this.loginService.setValue({ isLogin: true, user: response.user });
      })
    });
  }





  sendEmial() {
    this.checkemail = this.confirmEmail(this.sendemail);
    if (this.checkemail == false) {
      this.showWarning('Enter Correct Email')
      this.flags.isSubmitted = false;
    }
    else {
      this.spinner.showSpinner();
      this.api.forgetPassword({ email: this.sendemail, userType: 0 }).subscribe((response: any) => {
        this.spinner.hideSpinner();
        if (response.success == 400) return this.showWarning(response.message);
        $('.sendOtpform').show();
        this.flags.forgotPass = false;
        this.flags.isSubmitted = false;
      });
    }
  }

  enterotp() {
    if (!this.otpnumber) {
      this.showWarning('Enter OTP')
      this.flags.isSubmitted = false;
    }
    else {
      this.spinner.showSpinner();
      this.api.verifyOtp({ email: this.sendemail, userType: '0', password: this.otpnumber }).subscribe((response: any) => {
        this.spinner.hideSpinner();
        if (response.success == 400) return this.showWarning(response.message);
        $('.newpassword').show();
        this.otpnumber = '';
        this.userIdByRes = response.user._id;
        this.flags.forgotPass = false;
        this.flags.isSubmitted = false;
      });
    }
  }
  newpasswordfun() {
    if (!this.password) {
      this.showWarning('Enter New Password')
      this.flags.isSubmitted = false;
    }
    else {
      this.spinner.showSpinner();
      this.api.newchangePassword({ id: this.userIdByRes, userType: 0, password: this.password }).subscribe((response: any) => {
        this.spinner.hideSpinner();
        if (response.success == 400) return this.showWarning(response.message);
        if (response.success == 200) { this.showSuccess(response.message) }
        this.password = '';
        this.sendemail = '';
        $('#forgotModal').modal('hide');
        this.localStorage.set('user', response.user);
        // this.router.navigateByUrl('/browse');
        this.loginService.setValue({ isLogin: true, user: response.user });
        this.flags.forgotPass = false;
        this.flags.isSubmitted = false;
      });
    }
  }



  confirmEmail(email) {
    var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i
    if (!pattern.test(email)) {
      return false;
    }
    else {
      return true;
    }
  }

  forgotModal() {
    $('#forgotModal').modal('show');
    $('#loginModal').modal('hide');
  }

  clear() {
    this.signup = new signup;
  }

  showSuccess(message) {
    this.toastr.success(message, 'Success');
  }
  showWarning(message) {
    this.toastr.error(message, 'Error');
  }

}
