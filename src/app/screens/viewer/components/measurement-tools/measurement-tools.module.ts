import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { DialogModule } from 'primeng/dialog';

import { MeasurementToolsComponent } from './measurement-tools.component';
import { ToolModule } from '../tool/tool.module';

@NgModule({
  declarations: [MeasurementToolsComponent],
  imports: [CommonModule, MatButtonToggleModule, MatTabsModule, ToolModule, DialogModule],
  exports: [MeasurementToolsComponent]
})
export class MeasurementToolsModule {}
