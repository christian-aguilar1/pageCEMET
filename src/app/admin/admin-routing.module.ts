import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddDocumentComponent } from './components/add-document/add-document.component';
import { AddPositionComponent } from './components/add-position/add-position.component';
import { CreateNewComponent } from './components/create-new/create-new.component';
import { EditPositionComponent } from './components/edit-position/edit-position.component';

const routes: Routes = [
  {path: 'crear-noticia', component: CreateNewComponent},
  {path: 'agregar-cargo', component: AddPositionComponent},
  {path: 'editar-cargo/:id', component: EditPositionComponent},
  {path: 'agregar-documento', component: AddDocumentComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
