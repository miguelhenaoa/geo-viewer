import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { MatInputModule } from '@angular/material/input';

import { SpinnerModule } from '../../../../components/spinners/spinner.module';
import { UploadFileComponent } from './upload-file.component';

@NgModule({
  declarations: [UploadFileComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    DynamicDialogModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    SpinnerModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [UploadFileComponent]
})
export class UploadFileModule {}
