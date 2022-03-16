import Graphic from '@arcgis/core/Graphic';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';

export interface FileLayerResponse {
  layers: FeatureLayer[];
  graphics: Graphic[];
}
