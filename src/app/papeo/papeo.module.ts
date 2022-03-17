import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PapeoRoutingModule } from './papeo-routing.module';
import { PapeoComponent } from './components/papeo/papeo.component';


@NgModule({
  declarations: [
    PapeoComponent
  ],
  imports: [
    CommonModule,
    PapeoRoutingModule
  ]
})
export class PapeoModule { }
