import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  hasToken() {
    return !!this.getToken();
  }

  setToken(token) {
      window.localStorage.setItem(environment.appName, token);
  }

  getToken() {
      return window.localStorage.getItem(environment.appName);
  }

  removeToken() {
      window.localStorage.removeItem(environment.appName);
  }

  isTokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp ?? false;
    if (expiry) {
      return (Math.floor((new Date).getTime() / 1000)) >= expiry;
    }
    return false;
  }
}
