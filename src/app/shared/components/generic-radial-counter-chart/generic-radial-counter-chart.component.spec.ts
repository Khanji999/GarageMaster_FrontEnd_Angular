import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericRadialCounterChartComponent } from './generic-radial-counter-chart.component';

describe('GenericRadialCounterChartComponent', () => {
  let component: GenericRadialCounterChartComponent;
  let fixture: ComponentFixture<GenericRadialCounterChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenericRadialCounterChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenericRadialCounterChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
