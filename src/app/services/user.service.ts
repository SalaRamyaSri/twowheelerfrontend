import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  signUp(data: any) {
    return this.httpClient.post(this.url + "/user/signUp", data, {
      headers: new HttpHeaders().set('Content-Type', "application/json"),
    });
  }

  forgotPassowrd(data: any){
    return this.httpClient.post(this.url + "/user/forgotPassowrd", data, {
      headers: new HttpHeaders().set('Content-Type', "application/json"),
    });
  }

  login(data: any){
    return this.httpClient.post(this.url + "/api/admin/validate", data, {
      headers: new HttpHeaders().set('Content-Type', "application/json"),
    });
  }

  checkToken(){
    return this.httpClient.get(this.url + "/user/checkToken");
  }

  checkPassword(data: any){
    return this.httpClient.post(this.url + "/api/admin/checkPassowrd", data, {
      headers: new HttpHeaders().set('Content-Type', "application/json"),
    });
  }
}
