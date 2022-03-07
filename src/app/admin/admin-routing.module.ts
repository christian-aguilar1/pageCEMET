import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddPositionComponent } from './components/add-position/add-position.component';
import { AdminComponent } from './components/admin/admin.component';
import { CreateNewComponent } from './components/create-new/create-new.component';
import { EditPositionComponent } from './components/edit-position/edit-position.component';

const routes: Routes = [
  {path: '', component: AdminComponent},
  {path: 'crear-noticia', component: CreateNewComponent},
  {path: 'agregar-cargo', component: AddPositionComponent},
  {path: 'editar-cargo/:id', component: EditPositionComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
