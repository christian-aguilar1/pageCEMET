import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [],
  exports: [
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    // MatFormFieldControl
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    // MatFormFieldControl
  ]
})
export class MaterialModule { }
