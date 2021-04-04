import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getAPIStatus() {
    return this.http.get(`${environment.endpoint}/actuator/health`);
  }

  getAPIInfo() {
    return this.http.get(`${environment.endpoint}/actuator/info`)
    .pipe(delay(2000));
  }
}
