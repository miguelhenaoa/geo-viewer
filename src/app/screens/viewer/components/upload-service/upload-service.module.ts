import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DynamicDialogModule } from 'primeng/dynamicdialog';

import { UploadServiceComponent } from './upload-service.component';
import { SpinnerModule } from '../../../../components/spinners/spinner.module';

@NgModule({
  declarations: [UploadServiceComponent],
  imports: [
    CommonModule,
    DynamicDialogModule,
    FlexLayoutModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    SpinnerModule
  ],
  exports: [UploadServiceComponent]
})
export class UploadServiceModule {}
