import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppEmployeeFormComponent } from './app-employee-form.component';

describe('AppEmployeeFormComponent', () => {
  let component: AppEmployeeFormComponent;
  let fixture: ComponentFixture<AppEmployeeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppEmployeeFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppEmployeeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
