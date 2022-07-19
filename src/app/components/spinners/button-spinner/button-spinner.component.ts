import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-button-spinner',
  templateUrl: './button-spinner.component.html',
  styleUrls: ['./button-spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonSpinnerComponent {
  constructor() {}
}
