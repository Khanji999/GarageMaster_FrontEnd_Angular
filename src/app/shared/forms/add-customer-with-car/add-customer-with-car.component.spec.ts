import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCustomerWithCarComponent } from './add-customer-with-car.component';

describe('AddCustomerWithCarComponent', () => {
  let component: AddCustomerWithCarComponent;
  let fixture: ComponentFixture<AddCustomerWithCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCustomerWithCarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCustomerWithCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
