import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'getceleb';

  constructor(
   
    private spinner: NgxSpinnerService
  ) {}

  showSpinner(){
    this.spinner.show();
  }

  hideSpinner(){
     this.spinner.hide();
  }
}
