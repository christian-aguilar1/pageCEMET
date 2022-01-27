import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MailSenderService {

  constructor(private _http: HttpClient) { }

  sendMessage(name: string, email: string, message: string) {
    console.log(name, email, message)
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this._http.post(environment.mailSender,
      { name: name, replyto: email, message: message },
      { 'headers': headers }).subscribe(
        response => {
          console.log(response);
          return response;
        }
      );
  }
}
