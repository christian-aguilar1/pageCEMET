import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditNewComponent } from './components/edit-new/edit-new.component';
import { AddDocumentComponent } from './components/add-document/add-document.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { AddPositionComponent } from './components/add-position/add-position.component';
import { CreateNewComponent } from './components/create-new/create-new.component';
import { EditPositionComponent } from './components/edit-position/edit-position.component';

const routes: Routes = [
  {path: 'crear-noticia', component: CreateNewComponent},
  {path: 'editar-noticia/:id', component: EditNewComponent},
  {path: 'agregar-cargo', component: AddPositionComponent},
  {path: 'editar-cargo/:id', component: EditPositionComponent},
  {path: 'agregar-documento', component: AddDocumentComponent},
  {path: 'agregar-evento', component: AddEventComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
