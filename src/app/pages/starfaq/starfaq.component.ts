import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-starfaq',
  templateUrl: './starfaq.component.html',
  styleUrls: ['./starfaq.component.scss']
})
export class StarfaqComponent implements OnInit {

  constructor(
    public meta: Meta,
    public title: Title
  ) { 
    this.title.setTitle('GetCeleb - Get Personalized video messages from your favorite celebrities in India')
    this.meta.updateTag({ name: 'description', content: 'GetCeleb is a platform where fans can book personalised video shoutouts/greetings/advise from their favorite celebrities, athletes, or influencers. Our mission is to create the most authentic and memorable fan experiences in the world. Gift a video message from a celebrity in India' });
  }

  ngOnInit() {
  }

}
