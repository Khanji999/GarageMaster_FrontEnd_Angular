import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMaintenanceFormComponent } from './update-maintenance-form.component';

describe('UpdateMaintenanceFormComponent', () => {
  let component: UpdateMaintenanceFormComponent;
  let fixture: ComponentFixture<UpdateMaintenanceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateMaintenanceFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateMaintenanceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
