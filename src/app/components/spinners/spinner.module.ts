import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ButtonSpinnerComponent } from './button-spinner/button-spinner.component';

@NgModule({
  declarations: [ButtonSpinnerComponent],
  imports: [CommonModule, MatProgressSpinnerModule, FlexLayoutModule],
  exports: [ButtonSpinnerComponent]
})
export class SpinnerModule {}
