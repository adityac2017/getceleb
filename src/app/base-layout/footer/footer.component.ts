import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  path:string;
  constructor() { }
  

  ngOnInit() {
    this.getPath();
  }

  getPath(){
    this.path = window.location.pathname;
      }

}
