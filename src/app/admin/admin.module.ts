import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { QuillModule } from 'ngx-quill';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './components/admin/admin.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    AdminComponent
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
