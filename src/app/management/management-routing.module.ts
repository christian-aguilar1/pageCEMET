import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ManagementOldComponent } from './components/management-old/management-old.component';
import { ManagementComponent } from './components/management/management.component';

const routes: Routes = [
  { path: '', component: ManagementComponent },
  { path: ':id', component: ManagementOldComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagementRoutingModule {}
