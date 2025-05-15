import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMaintenanceComponent } from './my-maintenance.component';

describe('MyMaintenanceComponent', () => {
  let component: MyMaintenanceComponent;
  let fixture: ComponentFixture<MyMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyMaintenanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
