import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BodyComponent} from "./base-layout/body/body.component";
import {HomepageComponent} from "./pages/homepage/homepage.component";
import {HomeComponent} from "./pages/home/home.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {StarfaqComponent} from "./pages/starfaq/starfaq.component";
import {ClientprofileComponent} from "./pages/clientprofile/clientprofile.component";
import {PrivacypolicyComponent} from "./pages/privacypolicy/privacypolicy.component";
import { AuthGuard } from 'src/app/services/auth.service';
import {PaymentComponent} from "./pages/payment/payment.component";
import {DeclineComponent} from "./pages/payment/decline/decline.component";
import { Covid19Component } from './pages/covid19/covid19.component';

const routes: Routes = [

  { path: '', component: BodyComponent, children: [
      {path: '',component: HomepageComponent},
      {path: 'browse',component: HomeComponent},
      {path: 'profile',canActivate: [AuthGuard],component: ProfileComponent},
      {path: 'celeb/:userId',component: ClientprofileComponent},
      {path: 'starfaq',component: StarfaqComponent},
      {path: 'policy',component: PrivacypolicyComponent},
      {path: 'payment',component: PaymentComponent},
      {path: 'decline',component: DeclineComponent},
      {path: 'covid19',component: Covid19Component},
      {path: 'Covid19',component: Covid19Component},
    ]
  }
];    

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
