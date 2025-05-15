import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllVehicleComponent } from './view-all-vehicle.component';

describe('ViewAllVehicleComponent', () => {
  let component: ViewAllVehicleComponent;
  let fixture: ComponentFixture<ViewAllVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAllVehicleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAllVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
