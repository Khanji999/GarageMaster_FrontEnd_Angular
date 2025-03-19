import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingMaintenanceComponent } from './adding-maintenance.component';

describe('AddingMaintenanceComponent', () => {
  let component: AddingMaintenanceComponent;
  let fixture: ComponentFixture<AddingMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddingMaintenanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddingMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
