import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleModelMangementComponent } from './vehicle-model-mangement.component';

describe('VehicleModelMangementComponent', () => {
  let component: VehicleModelMangementComponent;
  let fixture: ComponentFixture<VehicleModelMangementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleModelMangementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleModelMangementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
