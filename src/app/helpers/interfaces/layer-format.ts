export enum TypeLayer {
  ShapeFile = 'ShapeFile',
  Csv = 'CSV',
  Gpx = 'GPX',
  GeoJSON = 'GeoJSON'
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
  [TypeLayer.GeoJSON]: { name: TypeLayer.GeoJSON, type: 'application/json', extension: 'json' }
};
