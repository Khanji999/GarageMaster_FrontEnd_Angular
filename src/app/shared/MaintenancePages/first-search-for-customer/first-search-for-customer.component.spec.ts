import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstSearchForCustomerComponent } from './first-search-for-customer.component';

describe('FirstSearchForCustomerComponent', () => {
  let component: FirstSearchForCustomerComponent;
  let fixture: ComponentFixture<FirstSearchForCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirstSearchForCustomerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstSearchForCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
