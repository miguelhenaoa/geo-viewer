import { Component, OnInit } from '@angular/core';
import PopupTemplate from '@arcgis/core/PopupTemplate.js';
import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer.js';
import LabelClass from '@arcgis/core/layers/support/LabelClass.js';
import SimpleRenderer from '@arcgis/core/renderers/SimpleRenderer.js';
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol.js';
import SimpleLineSymbol from '@arcgis/core/symbols/SimpleLineSymbol.js';
import Color from '@arcgis/core/Color.js';

import { ViewerBase } from './viewer-base';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent extends ViewerBase implements OnInit {
  showMeasurementTools = false;

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.initializeMap();
    this.setLocalLayers();
  }

  openMeasurementTools(): void {
    this.showMeasurementTools = true;
  }

  // TODO: Remove this method when the map is ready
  setLocalLayers(): void {
    const renderer = new SimpleRenderer({
      symbol: new SimpleFillSymbol({
        color: new Color('#A0B7DA'),
        style: 'solid',
        outline: new SimpleLineSymbol({
          color: 'white',
          width: 1
        })
      })
    });

    const popupTemplate = new PopupTemplate({
      title: '{subregion}',
      content: '<b>Nombre</b>: {subregion}<br><b>Código</b>: {FID}',
      fieldInfos: []
    });

    this.setLocalLayer(popupTemplate, '$feature.subregion', 'Subregiones', 'Subregiones', renderer);
    const fields = [
      '<b>Nombre</b>: {nombre}<br>',
      '<b>Código</b>: {codmpo}<br>',
      '<b>Tipo de documento</b>: {tipo_docum}<br>',
      '<b>Documento</b>: {docum}<br>',
      '<b>Fecha</b>: {fecha_doc}<br>',
      '<b>Categoría</b>: {categoria}<br>',
      '<b>Subregion</b>: {subregion}<br>'
    ];

    const popupTemplate2 = new PopupTemplate({
      title: '{nombre}',
      content: fields.join(''),
      fieldInfos: []
    });
    const renderer2 = new SimpleRenderer({
      symbol: new SimpleFillSymbol({
        color: new Color('#BDDAA0'),
        style: 'solid',
        outline: new SimpleLineSymbol({
          color: 'white',
          width: 1
        })
      })
    });
    this.setLocalLayer(popupTemplate2, '$feature.nombre', 'Limites_Municipales', 'Limites Municipales', renderer2);
  }

  setLocalLayer(
    popupTemplate: PopupTemplate,
    expression: string,
    fileName: string,
    title: string,
    renderer: SimpleRenderer
  ): void {
    const label = new LabelClass({
      labelExpressionInfo: { expression },
      symbol: {
        type: 'text',
        color: 'black',
        haloSize: 1,
        haloColor: 'white',
        font: {
          size: 7.5
        }
      }
    });
    const origin = window.location.origin;
    const geojsonLayer = new GeoJSONLayer({
      url: `${origin}/assets/json/${fileName}.json`,
      popupTemplate,
      labelingInfo: [label],
      title,
      renderer,
      opacity: 0.7
    });

    this.map.add(geojsonLayer);
  }
}
