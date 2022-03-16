/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import { Component } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

import { FormatLayer, FORMATS, TypeLayer } from '../../../../helpers/interfaces/layer-format';
import { UploadFileBase } from './upload-file-base';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent extends UploadFileBase {
  formats = FORMATS;
  hasFile = false;

  constructor(private ref: DynamicDialogRef, private config: DynamicDialogConfig) {
    super(ref);
    const type: TypeLayer = this.config.data?.type;
    this.format = this.formats[type];
  }

  get canSubmit(): boolean {
    return this.hasFile && this.isFormat;
  }

  change(_event: Event): void {
    const inputElement = _event.target as HTMLInputElement;
    const files = inputElement.files;
    this.hasFile = (files?.length || 0) > 0;
    const type = (): string => {
      const file = files?.item(0);
      const ext = file?.name.split('.').pop();
      return (file?.type || ext) as string;
    };
    this.isFormat = type() === this.format.type;
  }

  uploadFile(_event: SubmitEvent): void {
    this.isLoading = true;
    const formElement = _event?.target as HTMLFormElement;
    const inputElement = formElement.elements.namedItem('file') as HTMLInputElement;
    const file = inputElement.files?.item(0) as File;
    const filename = file.name;

    switch (this.format.name) {
      case TypeLayer.Csv:
        this.loadCsvLayer(file, '');
        break;
      case TypeLayer.GeoJSON:
        this.loadGeoJSONLayer(file);
        break;
      case TypeLayer.Gpx:
        this.loadGpxOrShapeFileLayer(filename, formElement);
        break;
      case TypeLayer.ShapeFile:
        this.loadGpxOrShapeFileLayer(filename, formElement);
        break;
      default:
        break;
    }
  }

  onClose(): void {
    this.ref.close({ update: false });
  }
}
