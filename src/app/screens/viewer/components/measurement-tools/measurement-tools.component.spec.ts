import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasurementToolsComponent } from './measurement-tools.component';

describe('MeasurementToolsComponent', () => {
  let component: MeasurementToolsComponent;
  let fixture: ComponentFixture<MeasurementToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MeasurementToolsComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasurementToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
