import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedMaintenanceComponent } from './selected-maintenance.component';

describe('SelectedMaintenanceComponent', () => {
  let component: SelectedMaintenanceComponent;
  let fixture: ComponentFixture<SelectedMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectedMaintenanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
