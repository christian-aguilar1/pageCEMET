import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { NewsPageComponent } from './components/news-page/news-page.component';
import { SharedModule } from '../shared/shared.module';
import { NewsComponent } from './components/news/news.component';


@NgModule({
  declarations: [
    NewsPageComponent,
    NewsComponent
  ],
  imports: [
    CommonModule,
    NewsRoutingModule,
    SharedModule
  ]
})
export class NewsModule { }
