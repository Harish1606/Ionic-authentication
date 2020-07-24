import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }

  post(serviceName:string ,data:any){
    const headers=new HttpHeaders();
    const options={headers:headers,withCredintials:false}
    const url=environment.apiURL+serviceName;
    return this.http.post(url,JSON.stringify(data),options);
  }
}
