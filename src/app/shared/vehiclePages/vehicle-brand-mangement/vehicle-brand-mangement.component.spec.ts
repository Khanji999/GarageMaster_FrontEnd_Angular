import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleBrandMangementComponent } from './vehicle-brand-mangement.component';

describe('VehicleBrandMangementComponent', () => {
  let component: VehicleBrandMangementComponent;
  let fixture: ComponentFixture<VehicleBrandMangementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleBrandMangementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleBrandMangementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
