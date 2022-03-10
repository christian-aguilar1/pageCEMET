import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { GoogleApiService } from 'ng-gapi';
import { Observable } from 'rxjs';

// import * as gapiClient from "@types/gapi.client";

import { GapiService } from 'src/app/core/services/gapi/gapi.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-papeo',
  templateUrl: './papeo.component.html',
  styleUrls: ['./papeo.component.scss']
})
export class PapeoComponent implements OnInit {

  private readonly API_URL: string = 'https://www.googleapis.com/drive/v3/';
  http: any;

  constructor(private googleapiService: GoogleApiService, private gapiService: GapiService,) {
    this.googleapiService.onLoad().subscribe(()=> {
      // Loads gapi.client (!! not loaded by GoogleApiService !!)
      gapi.load('client:auth2', this.initClient);
    });
  }

  ngOnInit(): void {
  }

  public isLoggedIn(): boolean {
    return this.gapiService.isUserSignedIn();
  }

  public signIn() {
    this.gapiService.signIn();
  }

  private initClient() {
    gapi.client.init({
      apiKey: environment.GAPI_API_KEY,
      clientId: environment.GAPI_CLIENT_ID,
      discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
      scope: [
        "https://www.googleapis.com/auth/drive"
      ].join(" ")
    }).then(result => {
      console.log('GAPI initiated');
      // This happens later.
    });
  }

  // public getFiles(): Observable<any> {
  //   console.log('Getting files');
  //   // This happens quickly (when the component initialises (ngOnInit))
  //   return gapi.client({
  //   //   pageSize: 100,
  //   //   fields: "nextPageToken, files(id, name, mimeType, modifiedTime, size)",
  //   //   q: 'root in parents and trashed = false'
  //   // }).then((res: any) => {
  //   //   return res;
  //   })
  // }

}
