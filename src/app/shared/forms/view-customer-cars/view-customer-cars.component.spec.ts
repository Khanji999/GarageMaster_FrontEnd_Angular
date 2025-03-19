import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCustomerCarsComponent } from './view-customer-cars.component';

describe('ViewCustomerCarsComponent', () => {
  let component: ViewCustomerCarsComponent;
  let fixture: ComponentFixture<ViewCustomerCarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewCustomerCarsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCustomerCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
