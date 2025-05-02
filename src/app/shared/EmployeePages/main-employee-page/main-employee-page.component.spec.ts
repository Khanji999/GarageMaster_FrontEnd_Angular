import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainEmployeePageComponent } from './main-employee-page.component';

describe('MainEmployeePageComponent', () => {
  let component: MainEmployeePageComponent;
  let fixture: ComponentFixture<MainEmployeePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainEmployeePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainEmployeePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
