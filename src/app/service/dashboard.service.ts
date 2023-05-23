import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }
 
   getDashboardData(){
    return this.httpClient.get(this.url+"/dashboard/getData")
   }
}
