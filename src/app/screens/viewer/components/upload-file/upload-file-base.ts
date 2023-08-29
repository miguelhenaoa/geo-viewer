/* eslint-disable no-template-curly-in-string */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import SpatialReference from '@arcgis/core/geometry/SpatialReference';
import esriRequest from '@arcgis/core/request';
import Graphic from '@arcgis/core/Graphic';
import PopupTemplate from '@arcgis/core/PopupTemplate';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import SimpleRenderer from '@arcgis/core/renderers/SimpleRenderer';
import Field from '@arcgis/core/layers/support/Field';
import { geojsonToArcGIS } from '@terraformer/arcgis';
import { GeoJSON } from 'geojson';

import { FormatLayer, TypeLayer } from '../../../../helpers/interfaces/layer-format';
import { FileLayerResponse } from '../../../../helpers/interfaces/file-layer-response';

export class UploadFileBase {
  format!: FormatLayer;
  isFormat = false;
  isLoading = false;

  constructor(private dialogRef: DynamicDialogRef) {}

  loadCsvLayer(file: File, coordinate: string): void {
    // To do
  }

  loadGeoJSONLayer(file: File): void {
    const fileName = file.name.split('.').shift();
    const reader = new FileReader();
    reader.onload = () => {
      const result: string | undefined = reader.result?.toString();
      const featureCollection = JSON.parse(<string>result);
      this.addGeoJsonToMap(featureCollection, fileName).then(
        response => {
          this.dialogRef.close({ update: true, ...response });
          this.isLoading = false;
        },
        error => {
          console.error(error);
          this.isLoading = false;
        }
      );
    };
    reader.readAsText(file);
  }

  loadGpxOrShapeFileLayer(filename: string, body: HTMLFormElement): void {
    this.generateFeatureCollection(filename, body).then(
      response => {
        try {
          const featureCollection = response?.data.featureCollection;
          const callback =
            this.format.name === TypeLayer.ShapeFile
              ? this.addShapefileToMap(featureCollection)
              : this.addGpxToMap(featureCollection);

          callback.then(response => {
            this.dialogRef.close({ update: true, ...response });
            this.isLoading = false;
          });
        } catch (error) {
          this.isLoading = false;
        }
      },
      error => {
        this.isLoading = false;
        console.error(error);
      }
    );
  }

  private generateFeatureCollection(filename: string, body: HTMLFormElement): Promise<any> {
    const filetype = this.format.extension;
    const name = filename.split('.').shift()?.replace('c:\\fakepath\\', '');
    const spatialReference: SpatialReference = new SpatialReference();

    const params = {
      enforceInputFileSizeLimit: true,
      enforceOutputJsonSizeLimit: true,
      generalize: true,
      maxAllowableOffset: 10,
      name,
      numberOfDigitsAfterDecimal: 0,
      reducePrecision: true,
      targetSR: spatialReference
    };

    const query = {
      filetype,
      publishParameters: JSON.stringify(params),
      f: 'json'
    };

    return esriRequest('https://www.arcgis.com/sharing/rest/content/features/generate', {
      body,
      query,
      responseType: 'json',
      timeout: 0
    }).then(
      response => Promise.resolve(response),
      error => Promise.reject(error)
    );
  }

  private addGpxToMap(featureCollection: any): Promise<FileLayerResponse> {
    const layerName = featureCollection.layers[0].featureSet.features[0].attributes.name;
    const title = `GPX - ${layerName}`;
    let graphics: Graphic[] = [];

    const layers = featureCollection.layers.map((layer: any) => {
      const copyright = layer.layerDefinition.copyrightText;
      const popup = new PopupTemplate({
        content: '${*}',
        title: 'Atributos GPX'
      });
      const source = layer.featureSet.features.map((feature: Object) => {
        return Graphic.fromJSON(feature);
      });
      graphics = graphics.concat(source);

      return new FeatureLayer({
        id: 'local',
        copyright,
        title,
        objectIdField: 'FID',
        source,
        popupTemplate: popup,
        renderer: SimpleRenderer.fromJSON(layer.layerDefinition.drawingInfo.renderer),
        fields: layer.layerDefinition.fields.map((field: Object) => {
          return Field.fromJSON(field);
        })
      });
    });

    return Promise.resolve({ layers, graphics });
  }

  private addShapefileToMap(featureCollection: any): Promise<FileLayerResponse> {
    let graphics: Graphic[] = [];
    const layersInOrder = this.sortLayers(featureCollection.layers);

    const layers = layersInOrder.map(layer => {
      const title = `Shape - ${layer.layerDefinition.name}`;
      const source = layer.featureSet.features.map((feature: Object) => {
        return Graphic.fromJSON(feature);
      });
      graphics = graphics.concat(source);
      const renderer = SimpleRenderer.fromJSON(layer.layerDefinition.drawingInfo.renderer);

      return new FeatureLayer({
        id: 'local',
        copyright: layer.layerDefinition.copyrightText,
        title,
        objectIdField: 'FID',
        source,
        fields: layer.layerDefinition.fields.map((field: Object) => {
          return Field.fromJSON(field);
        }),
        renderer
      });
    });
    return Promise.resolve({ layers, graphics });
  }

  private addGeoJsonToMap(featureCollection: any, title: string = 'GeoJSON'): Promise<FileLayerResponse> {
    try {
      let graphics: Graphic[] = [];
      const source = featureCollection.features.map((feature: GeoJSON) => {
        return Graphic.fromJSON(geojsonToArcGIS(feature));
      });
      graphics = graphics.concat(source);
      const fields = [
        new Field({
          name: 'ObjectID',
          alias: 'ObjectID',
          type: 'oid'
        })
      ];
      const feature = new FeatureLayer({
        id: 'local',
        copyright: '',
        fields,
        source: graphics,
        title
      });

      return Promise.resolve({ layers: [feature], graphics });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  private sortLayers(layers: Array<any>): Array<any> {
    const layersInOrder: any[] = [];
    layers.map(layer => {
      const geometryType = layer.featureSet.geometryType;
      geometryType.includes('Point') || geometryType.includes('Polyline')
        ? layersInOrder.push(layer)
        : layersInOrder.unshift(layer);
    });
    return layersInOrder;
  }
}
