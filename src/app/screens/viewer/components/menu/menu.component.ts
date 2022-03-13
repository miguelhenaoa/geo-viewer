import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  items!: MenuItem[];

  constructor() {}

  ngOnInit(): void {
    this.buildMenu();
  }

  buildMenu(): void {
    const icon = 'esri-icon-feature-layer';
    this.items = [
      {
        label: 'Cargar capas',
        icon: 'esri-icon-upload',
        items: [
          { label: 'ShapeFile', icon },
          { label: 'Archivo CSV', icon },
          { label: 'Archivo GPX', icon },
          { label: 'Archivo GeoJSON', icon },
          { label: 'Servicio KML', icon },
          { label: 'Servicio WMS', icon },
          { label: 'Servicio GeoJSON', icon },
          { label: 'Servicio CSV', icon }
        ]
      }
    ];
  }
}
