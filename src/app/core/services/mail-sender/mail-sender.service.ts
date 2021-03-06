import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MailSenderService {
  constructor(private _http: HttpClient) {}

  sendMessage(name: string, email: string, message: string, form: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (form === 'contact') {
      this._http
        .post(
          environment.mailSenderContact,
          { name: name, replyto: email, message: message },
          { headers: headers }
        )
        .subscribe((response) => {
          return response;
        });
    } else if (form === 'complaints') {
      this._http
        .post(
          environment.mailSenderComplaints,
          { name: name, replyto: email, message: message },
          { headers: headers }
        )
        .subscribe((response) => {
          return response;
        });
    }
  }
}
