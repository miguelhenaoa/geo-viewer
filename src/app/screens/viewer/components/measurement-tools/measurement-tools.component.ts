import { Component, ChangeDetectionStrategy, Input, AfterViewInit } from '@angular/core';
import MapView from '@arcgis/core/views/MapView';
import DistanceMeasurement2D from '@arcgis/core/widgets/DistanceMeasurement2D';
import AreaMeasurement2D from '@arcgis/core/widgets/AreaMeasurement2D';
import CoordinateConversion from '@arcgis/core/widgets/CoordinateConversion';

@Component({
  selector: 'app-measurement-tools',
  templateUrl: './measurement-tools.component.html',
  styleUrls: ['./measurement-tools.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeasurementToolsComponent implements AfterViewInit {
  @Input() view!: MapView;
  activeWidget!: DistanceMeasurement2D | AreaMeasurement2D | CoordinateConversion;
  showMeasurementTools = false;

  constructor() {}

  ngAfterViewInit(): void {
    const container = this.createWidgetContainer();
    this.renderAreaMeasurement(container);
  }

  change(index: number): void {
    this.activeWidget.destroy();
    const container = this.createWidgetContainer();
    switch (index) {
      case 0:
        this.renderAreaMeasurement(container);
        break;
      case 1:
        this.renderDistanceMeasurement(container);
        break;
      case 2:
        this.renderCoordinateConversion(container);
        break;
      default:
        break;
    }
  }

  createWidgetContainer(): HTMLDivElement {
    const container = document.createElement('div');
    container.id = 'widget';
    document.getElementById('measureWidget')?.appendChild(container);
    return container;
  }

  private renderAreaMeasurement(container: HTMLDivElement): void {
    const areaWidget = new AreaMeasurement2D({
      view: this.view,
      container,
      unit: 'hectares'
    });
    // areaWidget.viewModel.start();
    this.activeWidget = areaWidget;
  }

  private renderDistanceMeasurement(container: HTMLDivElement): void {
    const distanceWidget = new DistanceMeasurement2D({
      view: this.view,
      container,
      unit: 'kilometers'
    });
    distanceWidget.viewModel.start();
    this.activeWidget = distanceWidget;
  }

  private renderCoordinateConversion(container: HTMLDivElement): void {
    const coordinateWidget = new CoordinateConversion({
      view: this.view,
      container,
      orientation: 'expand-up'
    });
    this.activeWidget = coordinateWidget;
  }
}
