import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewsPageComponent } from './components/news-page/news-page.component';
import { NewsComponent } from './components/news/news.component';

const routes: Routes = [
  {path: '', component: NewsPageComponent},
  {path: ':id', component: NewsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }
