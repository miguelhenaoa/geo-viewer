import BasemapGallery from '@arcgis/core/widgets/BasemapGallery';
import Expand from '@arcgis/core/widgets/Expand';
import LayerList from '@arcgis/core/widgets/LayerList';
import Legend from '@arcgis/core/widgets/Legend';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Print from '@arcgis/core/widgets/Print';
import ScaleBar from '@arcgis/core/widgets/ScaleBar';
import Search from '@arcgis/core/widgets/Search';
import * as intl from '@arcgis/core/intl';

export class ViewerBase {
  map = new Map({ basemap: 'streets-vector' });
  view!: MapView;

  readonly latitude = 4.6486259;
  readonly longitude = -74.2478963;

  initializeMap(): void {
    intl.setLocale('es');
    this.view = new MapView({
      container: 'map',
      center: [this.longitude, this.latitude],
      popup: {
        autoOpenEnabled: true,
        dockEnabled: true,
        dockOptions: {
          position: 'top-right',
          breakpoint: false
        }
      },
      zoom: 5,
      map: this.map
    });

    this.renderWidgets();
  }

  private renderWidgets(): void {
    const scaleBar = new ScaleBar({
      style: 'ruler',
      unit: 'metric',
      view: this.view
    });

    const search = new Search({
      includeDefaultSources: true,
      locationEnabled: false,
      maxSuggestions: 10,
      view: this.view
    });

    const print = new Print({
      templateOptions: {
        copyright: 'Copyright © 2021',
        author: 'Miguel Henao'
      },
      view: this.view
    });

    const printExpand = new Expand({
      content: print,
      expandIconClass: 'esri-icon-printer',
      expandTooltip: 'Print',
      group: 'expand',
      view: this.view
    });

    const basemapGallery = new BasemapGallery({
      view: this.view
    });

    const basemapExpand = new Expand({
      content: basemapGallery,
      expandIconClass: 'esri-icon-basemap',
      expandTooltip: 'Basemap',
      group: 'expand',
      view: this.view
    });

    const legend = new Legend({
      view: this.view
    });

    const legendExpand = new Expand({
      content: legend,
      expandIconClass: 'esri-icon-legend',
      expandTooltip: 'Legends',
      group: 'expand',
      view: this.view
    });

    const layerList = new LayerList({
      multipleSelectionEnabled: true,
      selectionEnabled: false,
      view: this.view
    });

    const layerListExpand = new Expand({
      content: layerList,
      expandIconClass: 'esri-icon-layers',
      expandTooltip: 'Layer list',
      group: 'expand',
      view: this.view
    });

    const menuExpand = new Expand({
      expandIconClass: 'esri-icon-menu',
      view: this.view,
      content: document.getElementById('menu') as Node,
      group: 'expand',
      expandTooltip: 'Menu'
    });

    this.view.ui.add(scaleBar, 'bottom-left');
    this.view.ui.add(menuExpand, 'top-left');
    this.view.ui.add([search, printExpand, basemapExpand, legendExpand, layerListExpand], 'top-right');
    this.view.ui.move([{ component: ['zoom'], position: 'top-right', index: 1 }]);
  }
}
