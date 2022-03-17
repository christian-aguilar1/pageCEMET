import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MallaComponent } from './components/malla/malla.component';

const routes: Routes = [
  {path: '', component: MallaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MallaRoutingModule { }
