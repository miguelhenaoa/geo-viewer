export enum TypeLayer {
  ShapeFile = 'ShapeFile',
  Csv = 'CSV',
  Gpx = 'GPX',
  GeoJSON = 'GeoJSON',
  Kml = 'KML',
  Wms = 'WMS'
}

export interface FormatLayer {
  name: string;
  type: string;
  extension: string;
}

export const FORMATS = {
  [TypeLayer.ShapeFile]: { name: TypeLayer.ShapeFile, type: 'application/x-zip-compressed', extension: 'shapefile' },
  [TypeLayer.Csv]: { name: TypeLayer.Csv, type: 'csv', extension: 'csv' },
  [TypeLayer.Gpx]: { name: TypeLayer.Gpx, type: 'gpx', extension: 'gpx' },
  [TypeLayer.GeoJSON]: { name: TypeLayer.GeoJSON, type: 'application/json', extension: 'json' },
  [TypeLayer.Kml]: { name: TypeLayer.Kml, type: 'kml', extension: 'kml' },
  [TypeLayer.Wms]: { name: TypeLayer.Wms, type: 'wms', extension: 'wms' }
};
