import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';

import { ViewerRoutingModule } from './viewer-routing.module';
import { ViewerComponent } from './viewer.component';
import { MenuModule } from './components/menu/menu.module';
import { UploadFileModule } from './components/upload-file/upload-file.module';
import { UploadServiceModule } from './components/upload-service/upload-service.module';
import { MeasurementToolsModule } from './components/measurement-tools/measurement-tools.module';

@NgModule({
  declarations: [ViewerComponent],
  imports: [
    CommonModule,
    DialogModule,
    ViewerRoutingModule,
    MenuModule,
    UploadFileModule,
    UploadServiceModule,
    MeasurementToolsModule
  ]
})
export class ViewerModule {}
