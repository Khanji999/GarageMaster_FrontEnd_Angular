import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourthViewMaintenanceComponent } from './fourth-view-maintenance.component';

describe('FourthViewMaintenanceComponent', () => {
  let component: FourthViewMaintenanceComponent;
  let fixture: ComponentFixture<FourthViewMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FourthViewMaintenanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FourthViewMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
