import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllMaintenancesComponent } from './get-all-maintenances.component';

describe('GetAllMaintenancesComponent', () => {
  let component: GetAllMaintenancesComponent;
  let fixture: ComponentFixture<GetAllMaintenancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAllMaintenancesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAllMaintenancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
