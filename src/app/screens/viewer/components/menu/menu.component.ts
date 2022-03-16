import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

import { DialogSize } from '../../../../helpers/enums/dialog-size';
import { FileLayerResponse } from '../../../../helpers/interfaces/file-layer-response';
import { TypeLayer } from '../../../../helpers/interfaces/layer-format';
import { UploadFileComponent } from '../upload-file/upload-file.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  providers: [DialogService]
})
export class MenuComponent implements OnInit {
  @Output() addLayer = new EventEmitter<FileLayerResponse>();
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
          { label: 'ShapeFile', icon, command: () => this.openModal(TypeLayer.ShapeFile) },
          { label: 'Archivo CSV', icon },
          { label: 'Archivo GPX', icon, command: () => this.openModal(TypeLayer.Gpx) },
          { label: 'Archivo GeoJSON', icon, command: () => this.openModal(TypeLayer.GeoJSON) },
          { label: 'Servicio KML', icon },
          { label: 'Servicio WMS', icon },
          { label: 'Servicio GeoJSON', icon },
          { label: 'Servicio CSV', icon }
        ]
      }
    ];
  }

  openModal(type: TypeLayer): void {
    const dialog = this.dialogService.open(UploadFileComponent, {
      header: 'Cargar un archivo',
      width: DialogSize.XSmall,
      closable: false,
      data: { type }
    });

    dialog.onClose.subscribe(success => {
      const { update, layers, graphics } = success;
      if (update) {
        this.addLayer.emit({ layers, graphics });
      }
    });
  }
}
