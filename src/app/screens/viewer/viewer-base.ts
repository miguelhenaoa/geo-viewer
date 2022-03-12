import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';

export class ViewerBase {
  map = new Map({ basemap: 'streets-vector' });
  view!: MapView;

  readonly latitude = 4.6486259;
  readonly longitude = -74.2478963;

  initializeMap(): void {
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
  }
}
