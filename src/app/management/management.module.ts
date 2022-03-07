import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementRoutingModule } from './management-routing.module';
import { ManagementComponent } from './components/management/management.component';
import { SharedModule } from '../shared/shared.module';
import { ManagementCardComponent } from './components/management-card/management-card.component';


@NgModule({
  declarations: [
    ManagementComponent,
    ManagementCardComponent
  ],
  imports: [
    CommonModule,
    ManagementRoutingModule,
    SharedModule
  ]
})
export class ManagementModule { }
