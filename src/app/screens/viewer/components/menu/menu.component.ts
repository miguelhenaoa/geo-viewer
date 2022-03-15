import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

import { DialogSize } from '../../../../helpers/enums/dialog-size';
import { TypeLayer } from '../../../../helpers/interfaces/layer-format';
import { UploadFileComponent } from '../upload-file/upload-file.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  providers: [DialogService]
})
export class MenuComponent implements OnInit {
  items!: MenuItem[];

  constructor(public dialogService: DialogService) {}

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
          { label: 'ShapeFile', icon, command: () => this.addLayer(TypeLayer.ShapeFile) },
          { label: 'Archivo CSV', icon },
          { label: 'Archivo GPX', icon, command: () => this.addLayer(TypeLayer.Gpx) },
          { label: 'Archivo GeoJSON', icon },
          { label: 'Servicio KML', icon },
          { label: 'Servicio WMS', icon },
          { label: 'Servicio GeoJSON', icon },
          { label: 'Servicio CSV', icon }
        ]
      }
    ];
  }

  addLayer(type: TypeLayer): void {
    this.dialogService.open(UploadFileComponent, {
      header: 'Cargar un archivo',
      width: DialogSize.XSmall,
      data: { type }
    });
  }
}
