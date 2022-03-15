import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UploadFileComponent } from './upload-file.component';
import { SpinnerModule } from '../../../../components/spinners/spinner.module';

@NgModule({
  declarations: [UploadFileComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    DynamicDialogModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    SpinnerModule
  ],
  exports: [UploadFileComponent]
})
export class UploadFileModule {}
