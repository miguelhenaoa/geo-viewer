import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolComponent } from './tool.component';

@NgModule({
  declarations: [ToolComponent],
  imports: [CommonModule],
  exports: [ToolComponent]
})
export class ToolModule {}
