import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementRoutingModule } from './management-routing.module';
import { ManagementComponent } from './components/management/management.component';
import { SharedModule } from '../shared/shared.module';
import { ManagementOldComponent } from './components/management-old/management-old.component';

@NgModule({
  declarations: [ManagementComponent, ManagementOldComponent],
  imports: [CommonModule, ManagementRoutingModule, SharedModule],
})
export class ManagementModule {}
