import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetapiService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'jsonp',
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods': 'GET'
    })
  }

  constructor(public http: HttpClient) { }

  getJSON(){
    this.http.get('https://www.instagram.com/cemetusach/?__a=1&callback=?').subscribe(data => {
      console.log("data", data);
    });
  }
}
