import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import CSVLayer from '@arcgis/core/layers/CSVLayer';
import KMLLayer from '@arcgis/core/layers/KMLLayer';
import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer';
import WMSLayer from '@arcgis/core/layers/WMSLayer';

import { FormatLayer, FORMATS, TypeLayer } from '../../../../helpers/interfaces/layer-format';

@Component({
  selector: 'app-upload-service',
  templateUrl: './upload-service.component.html',
  styleUrls: ['./upload-service.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadServiceComponent {
  formGroup = new FormGroup({ url: new FormControl('', Validators.required) });
  format!: FormatLayer;
  isLoading = false;
  isValid = true;

  constructor(private ref: DynamicDialogRef, private config: DynamicDialogConfig) {
    const type: TypeLayer = this.config.data?.type;
    this.format = FORMATS[type];
  }

  get canSubmit(): boolean {
    return this.isValid && this.formGroup.valid;
  }

  get urlControl(): AbstractControl | null {
    return this.formGroup.get('url');
  }

  onClose(): void {
    this.ref.close({ update: false });
  }

  onSave(): void {
    this.isLoading = true;
    const type = this.format.name;
    const url = this.urlControl?.value;
    switch (type) {
      case TypeLayer.Kml:
        this.addKmlToMap(url);
        break;
      case TypeLayer.Wms:
        this.addWmsToMap(url);
        break;
      case TypeLayer.GeoJSON:
        this.addGeoJSONToMap(url);
        break;
      case TypeLayer.Csv:
        this.addCsvToMap(url);
        break;
      default:
        break;
    }
  }

  private addCsvToMap(url: string): void {
    const csvLayer = new CSVLayer({ id: 'local', url });
    this.ref.close({ update: true, layers: [csvLayer] });
  }

  private addGeoJSONToMap(url: string): void {
    const geoJSONLayer = new GeoJSONLayer({ id: 'local', url });
    this.ref.close({ update: true, layers: [geoJSONLayer] });
  }

  private addKmlToMap(url: string): void {
    const kmlLayer = new KMLLayer({ id: 'local', url });
    this.ref.close({ update: true, layers: [kmlLayer] });
  }

  private addWmsToMap(url: string): void {
    const wmsLayer = new WMSLayer({ id: 'local', url });
    this.ref.close({ update: true, layers: [wmsLayer] });
  }
}
