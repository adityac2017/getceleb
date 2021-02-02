import { Component, OnInit } from '@angular/core';
import * as js from '../../../assets/js/custom';
import { LocalStorageService } from 'angular-web-storage';
import { AppComponent } from 'src/app/app.component';
import { ApiService } from 'src/app/services/api.service';
import {UrlService} from '../../services/url.service';
import { ToastrService } from 'ngx-toastr';
import { Meta } from '@angular/platform-browser';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  
      token:string;
      getList:[];
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
      private router:Router
      ) {
        this.title.setTitle('GetCeleb - Get Personalized video messages from your favorite celebrities in India')
        this.meta.updateTag({ name: 'description', content: 'GetCeleb is a platform where fans can book personalised video shoutouts/greetings/advise from their favorite celebrities, athletes, or influencers. Our mission is to create the most authentic and memorable fan experiences in the world. Gift a video message from a celebrity in India' });
        // this.meta.addTag({ name: 'author', content: 'talkingdotnet' });
        // this.meta.addTag({ name: 'keywords', content: 'Angular, Meta Service' });
       }

  ngOnInit() {
          js.swipper();
          this.imageUrl = this.url.imageUrl;
          const localdata =   this.localStorage.get('user');
          // this.token = localdata.token;
          this.getData();
  }

  getData(){
    this.spinner.showSpinner();
    // this.api.allTalentsWebsite().subscribe((response: any) => {
    //  this.spinner.hideSpinner();
    //   if(response.success == 400) return this.showWarning(response.message);
    //      this.getList = response.clients;
    //      this.totalCount = response.total;   
    //    });
    this.api.allUsersByCategory().subscribe((response: any) => {
      this.spinner.hideSpinner();
       if(response.success == 400) return this.showWarning(response.message);
          this.getList = response.clients;
          this.totalCount = response.total;   
        });
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
