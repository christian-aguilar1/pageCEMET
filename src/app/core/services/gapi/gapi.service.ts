import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';

import * as _ from "lodash";

import { GoogleAuthService } from 'ng-gapi';
import GoogleUser = gapi.auth2.GoogleUser;
// import GoogleAuth = gapi.auth2.GoogleAuth;

@Injectable({
  providedIn: 'root'
})
export class GapiService {

  public static SESSION_STORAGE_KEY: string = 'accessToken';
  GoogleAuth!: gapi.auth2.GoogleAuth;
  private user!: GoogleUser;

  constructor(private googleAuth: GoogleAuthService) { }

  initClient() {
    return new Promise<void>((resolve,reject)=>{
      gapi.load('client:auth2', () => {
          return gapi.client.init({
              apiKey: environment.GAPI_API_KEY,
              clientId: environment.GAPI_CLIENT_ID,
              discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
              scope: 'https://www.googleapis.com/auth/drive',
          }).then(() => {
              this.GoogleAuth = gapi.auth2.getAuthInstance();
              resolve();
          });
      });
    });
  }

  public setUser(user: GoogleUser): void {
    this.user = user;
  }

  public getCurrentUser(): GoogleUser {
    return this.user;
  }

  public getToken(): string | string[] | null {
    let token: any = sessionStorage.getItem(GapiService.SESSION_STORAGE_KEY);
    if (!token) {
      throw new Error("no token set , authentication required");
    }
    return sessionStorage.getItem(GapiService.SESSION_STORAGE_KEY);
}

  public signIn(): void {
    this.googleAuth.getAuth()
      .subscribe((auth) => {
          auth.signIn().then(res => this.signInSuccessHandler(res), err => this.signInErrorHandler(err));
      });
  }

  public isUserSignedIn() {
    // return isEmpty(sessionStorage.getItem(GapiService.SESSION_STORAGE_KEY));
    return !_.isEmpty(sessionStorage.getItem(GapiService.SESSION_STORAGE_KEY));
    // return false;
  }

  private signInSuccessHandler(res: any) {
    this.user = res;
    sessionStorage.setItem(
      GapiService.SESSION_STORAGE_KEY, res.getAuthResponse().access_token
    );
  }

  private signInErrorHandler(err: any) {
    console.warn(err);
  }
}
