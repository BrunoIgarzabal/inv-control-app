import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from '../token/token.service';
import { UserAuthenticated } from './user-auth';
import * as jtw_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<UserAuthenticated>(null);
  private userName: string;

  constructor(private tokenService: TokenService) {
    this.tokenService.hasToken() && this.decodeAndNotify();
  }
  
  setToken(token: string) {
    this.tokenService.setToken(token.substring(7));
    this.decodeAndNotify();
  }

  getUser() {
    return this.userSubject.asObservable();
  }

  private decodeAndNotify() {
    const token = this.tokenService.getToken();
    const user = jtw_decode.default(token) as UserAuthenticated;
    this.userName = user.sub;
    this.userSubject.next(user);
  }

  logout() {
    this.tokenService.removeToken();
    this.userName = null;
    this.userSubject.next(null);
  }

  isLogged() {
    if (this.tokenService.hasToken()) {
      const token = this.tokenService.getToken();
      if (this.tokenService.isTokenExpired(token)) {
        this.tokenService.removeToken();
        return false;
      }
      return true;
    }
    return false;
  }

  getUserName() {
    return this.userName;
  }
}
