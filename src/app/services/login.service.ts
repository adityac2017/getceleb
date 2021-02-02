import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLoggedIn: BehaviorSubject<any>;
  constructor(
    private localStoragea: LocalStorageService
  ) {
    if (localStoragea.get('user')) {
      this.isLoggedIn = new BehaviorSubject<any>({isLogin: true, user: this.localStoragea.get('user')});
    } else {
      this.isLoggedIn = new BehaviorSubject<any>({isLogin: false, user: null});
    }
  }
  public isLogin(): Observable<any> {
    return this.isLoggedIn.asObservable();
  }
  public setValue(value: any) {
    this.isLoggedIn.next(value);
  }
}
