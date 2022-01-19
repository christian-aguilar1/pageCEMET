import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsRoutingModule } from './forms-routing.module';
import { ComplaintsComponent } from './components/complaints/complaints.component';
import { SharedModule } from './../shared/shared.module';


@NgModule({
  declarations: [
    ComplaintsComponent
  ],
  imports: [
    CommonModule,
    FormsRoutingModule,
    SharedModule
  ]
})
export class FormsModule { }
