import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule }  from '@angular/fire/compat/database';
import { AngularFireStorageModule }  from '@angular/fire/compat/storage';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
// import {} from '@angular/fire/app-check';

import { SafePipeModule } from 'safe-pipe';

import { GoogleApiModule, GoogleApiService, GoogleAuthService, NgGapiClientConfig, NG_GAPI_CONFIG,
         GoogleApiConfig } from "ng-gapi";

// import {} from 'gapi.client.drive';

// import { QuillModule } from 'ngx-quill'


import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { SharedModule } from './shared/shared.module';
import { GapiService } from './core/services/gapi/gapi.service';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

// import { TooltipModule } from 'ngx-bootstrap/tooltip';
// import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

let gapiClientConfig: NgGapiClientConfig = {
  client_id: environment.GAPI_CLIENT_ID,
  discoveryDocs: ["https://analyticsreporting.googleapis.com/$discovery/rest?version=v4"],
  scope: [
    "https://www.googleapis.com/auth/analytics.readonly",
    "https://www.googleapis.com/auth/analytics"
  ].join(" ")
}

export function initGapi(gapiService: GapiService) {
  return () => gapiService.initClient();
}

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    PrivacyPolicyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    SafePipeModule,
    BsDatepickerModule.forRoot(),
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig
    }),
    // QuillModule.forRoot({
    //   customOptions: [{
    //     import: 'formats/font',
    //     whitelist: ['mirza', 'roboto', 'aref', 'serif', 'sansserif', 'monospace']
    //   }]
    // }),
  ],
  providers: [AngularFirestore, Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
