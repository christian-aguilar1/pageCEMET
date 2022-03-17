import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FormsRoutingModule } from './forms-routing.module';
import { ComplaintsComponent } from './components/complaints/complaints.component';
import { SharedModule } from './../shared/shared.module';
import { ContactComponent } from './components/contact/contact.component';


@NgModule({
  declarations: [
    ComplaintsComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    FormsRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class FormsModule { }
