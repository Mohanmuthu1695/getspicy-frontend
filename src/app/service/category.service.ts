import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }
  addCategory(data: any) {
    return this.httpClient.post(this.url + "/category/addcategory", data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  };
  updateCategory(data: any) {
    return this.httpClient.patch(this.url + "/category/updatecategory", data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  };
  getCategory() {
    return this.httpClient.get(this.url + "/category/getcategory");
  };
}

