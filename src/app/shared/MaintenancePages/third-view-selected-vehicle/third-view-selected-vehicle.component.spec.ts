import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdViewSelectedVehicleComponent } from './third-view-selected-vehicle.component';

describe('ThirdViewSelectedVehicleComponent', () => {
  let component: ThirdViewSelectedVehicleComponent;
  let fixture: ComponentFixture<ThirdViewSelectedVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThirdViewSelectedVehicleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThirdViewSelectedVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
