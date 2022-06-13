import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuicklinkModule } from 'ngx-quicklink';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { NewsCardComponent } from './components/news-card/news-card.component';


@NgModule({
  declarations: [
    HomeComponent,
    NewsCardComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    QuicklinkModule
  ]
})
export class HomeModule { }
