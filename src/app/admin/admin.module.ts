import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CreateNewComponent } from './components/create-new/create-new.component';
import { AddPositionComponent } from './components/add-position/add-position.component';
import { EditPositionComponent } from './components/edit-position/edit-position.component';
import { AddDocumentComponent } from './components/add-document/add-document.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { EditNewComponent } from './components/edit-new/edit-new.component';


@NgModule({
  declarations: [
    CreateNewComponent,
    AddPositionComponent,
    EditPositionComponent,
    AddDocumentComponent,
    AddEventComponent,
    EditNewComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AdminModule { }
