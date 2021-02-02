import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
import { AppComponent } from 'src/app/app.component';
import { ApiService } from 'src/app/services/api.service';
import {UrlService} from '../../services/url.service';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';
import { Meta } from '@angular/platform-browser';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
token:string;
getList:any[]=[];
imageUrl:string;
totalCount:number;
queryString:string;

      constructor(protected api: ApiService,
      private localStorage: LocalStorageService,
      private spinner: AppComponent,
      private toastr: ToastrService,
      private url: UrlService,
      public meta: Meta,
      public title: Title,
      private router: Router
      ) {
        this.title.setTitle('GetCeleb - Get Personalized video messages from your favorite celebrities in India')
        this.meta.updateTag({ name: 'description', content: 'GetCeleb is a platform where fans can book personalised video shoutouts/greetings/advise from their favorite celebrities, athletes, or influencers. Our mission is to create the most authentic and memorable fan experiences in the world. Gift a video message from a celebrity in India' });
       }

  ngOnInit() {
    this.imageUrl = this.url.imageUrl;
    const localdata = this.localStorage.get('user');
    this.getData();
  }

  getData(){
    this.spinner.showSpinner();
    this.api.getallTalentWebsite().subscribe((response: any) => {

     this.spinner.hideSpinner();
      if(response.success == 400) return this.showWarning(response.message);
         const result = response.clients;
         result.forEach(element => {
            element.tags = element.tag.join();
          });
          this.getList = result;
         this.totalCount = response.total;
       });
  }
  onChange(val){
    if(val == 'asec'){
      this.getList = _.sortBy(this.getList, 'vedioPrice');
    }
    else if(val == 'desc'){
      this.getList = _.sortBy(this.getList, 'vedioPrice');
      this.getList = this.getList.reverse();
    }
    else if(val == 'alphabetically'){
      this.getList = _.sortBy(this.getList, 'clientName');
    }
    else if(val == 'recommended'){
      this.getData();
    }

  }

  clientprofile(val){
    this.localStorage.set('clientId',val._id);
    this.router.navigateByUrl(`celeb/${val.instagramId}`)
  }

  showSuccess(message) {
    this.toastr.success(message, 'Success');
  }
  showWarning(message) {
    this.toastr.error(message, 'Error');
  }
}
