import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  signup(data: any) {
    return this.httpClient.post(this.url + "/user/signup", data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  };
  forgotPassword(data:any){
    return this.httpClient.post(this.url+"/user/forgotPassword",data,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  };
  login(data:any){
    return this.httpClient.post(this.url+"/user/login",data,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  };
  checkUser(){
    return this.httpClient.get(this.url +"/user/checkToken")
  }
  updatePassword(data:any){
    return this.httpClient.post(this.url + "/user/updatepassword", data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }
  getUser(){
    return this.httpClient.get(this.url+"/user/get")
  }
  updateUser(data:any){
    return this.httpClient.patch(this.url + "/user/updateuserStatus", data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }
}
