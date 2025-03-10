import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetMaintenanceComponent } from './get-maintenance.component';

describe('GetMaintenanceComponent', () => {
  let component: GetMaintenanceComponent;
  let fixture: ComponentFixture<GetMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetMaintenanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
