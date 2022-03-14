import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { QuillModule } from 'ngx-quill';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { CreateNewComponent } from './components/create-new/create-new.component';
import { AddPositionComponent } from './components/add-position/add-position.component';
import { EditPositionComponent } from './components/edit-position/edit-position.component';
import { AddDocumentComponent } from './components/add-document/add-document.component';


@NgModule({
  declarations: [
    CreateNewComponent,
    AddPositionComponent,
    EditPositionComponent,
    AddDocumentComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    QuillModule.forRoot({
      // customModules: [{
      //   implementation: Counter,
      //   path: 'modules/counter'
      // }],
      customOptions: [{
        import: 'formats/font',
        whitelist: ['mirza', 'roboto', 'aref', 'serif', 'sansserif', 'monospace']
      }]
    })
  ],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AdminModule { }
