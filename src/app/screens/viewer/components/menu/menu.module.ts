import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelMenuModule } from 'primeng/panelmenu';

import { MenuComponent } from './menu.component';

@NgModule({
  declarations: [MenuComponent],
  imports: [CommonModule, PanelMenuModule],
  exports: [MenuComponent]
})
export class MenuModule {}
