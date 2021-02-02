import { Component, OnInit } from '@angular/core';
import * as js from '../../../assets/js/custom';
import {Router} from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { LocalStorageService } from 'angular-web-storage';
import { AppComponent } from 'src/app/app.component';
import { ApiService } from 'src/app/services/api.service';
import {UrlService} from '../../services/url.service';
import {ActivatedRoute} from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLogin: boolean;
  token:string;
  userId:string;
  getList:any;
  history = window.history;
  path:string;
  constructor(private localStorage: LocalStorageService,
    private router: Router,
    private loginService: LoginService,
    private api: ApiService,
    private activatedRoute: ActivatedRoute,
    private spinner: AppComponent,
    private url: UrlService
    ) { }

  ngOnInit() {
    js.headerOpaque();
    js.mobileNav();
    js.navCollapse();
    // js.smoothScroll();
    this.loginService.isLogin().subscribe((isLoggedIn: any) => {
     
      this.isLogin = isLoggedIn.isLogin;
      this.getList = isLoggedIn.user;
    })
    const localdata =   this.localStorage.get('user');
    if(localdata){
      this.token = localdata.token;
      this.userId = localdata._id;
    }
    this.getPath();
  }

  getData(){
    this.spinner.showSpinner();
    this.api.getUserProfile({userId:this.userId},this.token).subscribe((response: any) => {
     this.spinner.hideSpinner();
      if(response.success == 200){
         this.getList = response.user;

      }
       });
  }

  logout () {
    this.localStorage.clear();
    this.loginService.setValue({isLogin: false, user: null});
    this.router.navigateByUrl('/')
    $('.navbar-toggler').trigger('click');
  }

  getPath(){
this.path = window.location.pathname;
  }
  
  closebv(){
    $(".navbar-collapse").collapse('hide');
  }
}
