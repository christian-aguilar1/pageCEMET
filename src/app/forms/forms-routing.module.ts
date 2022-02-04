import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ComplaintsComponent } from './components/complaints/complaints.component';
import { ContactComponent } from './components/contact/contact.component';

const routes: Routes = [
  {path: 'reclamos', component: ComplaintsComponent},
  {path: 'contacto', component: ContactComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule { }
