import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './base-layout/header/header.component';
import { FooterComponent } from './base-layout/footer/footer.component';
import { BodyComponent } from './base-layout/body/body.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ModalsComponent } from './base-layout/modals/modals.component';
import { HomeComponent } from './pages/home/home.component';
import { PrivacypolicyComponent } from './pages/privacypolicy/privacypolicy.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { StarfaqComponent } from './pages/starfaq/starfaq.component';
import { ClientprofileComponent } from './pages/clientprofile/clientprofile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider} from "angularx-social-login";
import { FilterPipe } from './services/filter.pipe';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { MatVideoModule } from 'mat-video';
import { PaymentComponent } from './pages/payment/payment.component';
import { DeclineComponent } from './pages/payment/decline/decline.component';
import { Covid19Component } from './pages/covid19/covid19.component';


let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider
    ('422110368494-rstknqh0uki7di1o42n5avgf3lc2m3k9.apps.googleusercontent.com')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("1148437125544239")
  }
]);

export function provideConfig() {
  return config;
}


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    HomepageComponent,
    ModalsComponent,
    HomeComponent,
    PrivacypolicyComponent,
    ProfileComponent,
    StarfaqComponent,
    ClientprofileComponent,
    FilterPipe,
    PaymentComponent,
    DeclineComponent,
    Covid19Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NgxSpinnerModule,
    SocialLoginModule,
    MatVideoModule,
    ShareButtonsModule,
    // HttpClientJsonpModule
  ],

  providers: [{provide: AuthServiceConfig,useFactory: provideConfig}], //live
  // providers: [{provide: AuthServiceConfig,useFactory: provideConfig},{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})


export class AppModule { }
