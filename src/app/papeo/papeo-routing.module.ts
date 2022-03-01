import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PapeoComponent } from './components/papeo/papeo.component';

const routes: Routes = [
  {path: '', component: PapeoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PapeoRoutingModule { }
