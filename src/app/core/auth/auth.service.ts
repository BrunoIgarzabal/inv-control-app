import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { UserService } from '../user/user.service';
import { environment } from 'src/environments/environment';
import { UserLogin } from '../user/user-auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
    private userService: UserService) { }

  authenticate(userLogin: UserLogin) {

    return this.http
      .post(
        environment.login_url, 
        userLogin, 
        { observe: 'response'} 
      )
      .pipe(tap(res => {
        const authToken = res.headers.get('Authorization');
        this.userService.setToken(authToken);
    }));
  }
}
