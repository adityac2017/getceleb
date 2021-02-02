import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AppComponent } from 'src/app/app.component';
import { ToastrService } from 'ngx-toastr';
import { UrlService } from 'src/app/services/url.service';
import * as js from '../../../assets/js/custom';

@Component({
  selector: 'app-covid19',
  templateUrl: './covid19.component.html',
  styleUrls: ['./covid19.component.scss']
})
export class Covid19Component implements OnInit {
  username:string;
  instaId:string;
  userPhone:string;
  data:any;
  username2:string;
  userPhone2:string;
  constructor(private api: ApiService,
    private spinner: AppComponent,
    private toastr: ToastrService,
    private url: UrlService) { }

  ngOnInit() {
    js.scrllt()
    js.enterNumber()
  }
  first(type){

    if(type == 1){
       this.data = {username:this.username,instaId:this.instaId,userPhone:this.userPhone};
    }else{
      this.data = {username:this.username2,userPhone:this.userPhone2};
    }
    this.spinner.showSpinner();
    this.api.sendMailParty(this.data).subscribe((response: any) => {
     this.spinner.hideSpinner();
      if(response.success == 400) return this.showWarning(response.message);
      this.showSuccess(response.message)
      this.username = null;
      this.instaId = null;
      this.userPhone = null;
      this.username2 = null;
      this.userPhone2 = null;
    })
  }

  showSuccess(message) {
    this.toastr.success(message, 'Success');
  }
  showWarning(message) {
    this.toastr.error(message, 'Error');
  }

}
