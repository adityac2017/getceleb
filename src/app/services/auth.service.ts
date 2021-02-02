import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import {user} from 'src/app/requests/admin';
import { LocalStorageService } from 'angular-web-storage';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  user = new user;
  constructor (private localStorage: LocalStorageService,) {} 
  
  
  canActivate(): boolean {
    if (!this.localStorage.get('user')) {
      alert('Your session is expire, please sign in.');
      window.location.href = '/';
      return false;
    }
    return true;
  }
}
