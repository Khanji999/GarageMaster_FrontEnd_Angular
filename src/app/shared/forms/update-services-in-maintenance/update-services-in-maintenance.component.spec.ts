import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateServicesInMaintenanceComponent } from './update-services-in-maintenance.component';

describe('UpdateServicesInMaintenanceComponent', () => {
  let component: UpdateServicesInMaintenanceComponent;
  let fixture: ComponentFixture<UpdateServicesInMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateServicesInMaintenanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateServicesInMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
