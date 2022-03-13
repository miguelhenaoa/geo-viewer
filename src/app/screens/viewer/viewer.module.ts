import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewerRoutingModule } from './viewer-routing.module';
import { ViewerComponent } from './viewer.component';
import { MenuModule } from './components/menu/menu.module';

@NgModule({
  declarations: [ViewerComponent],
  imports: [CommonModule, ViewerRoutingModule, MenuModule]
})
export class ViewerModule {}
