import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MallaRoutingModule } from './malla-routing.module';
import { MallaComponent } from './components/malla/malla.component';


@NgModule({
  declarations: [
    MallaComponent
  ],
  imports: [
    CommonModule,
    MallaRoutingModule
  ]
})
export class MallaModule { }
