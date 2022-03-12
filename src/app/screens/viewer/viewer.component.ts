import { Component, OnInit } from '@angular/core';

import { ViewerBase } from './viewer-base';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent extends ViewerBase implements OnInit {
  constructor() {
    super();
  }

  ngOnInit(): void {
    this.initializeMap();
  }
}
