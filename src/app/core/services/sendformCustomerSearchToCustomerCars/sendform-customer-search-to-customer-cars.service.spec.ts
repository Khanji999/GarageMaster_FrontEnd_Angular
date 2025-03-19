import { TestBed } from '@angular/core/testing';

import { SendformCustomerSearchToCustomerCarsService } from './sendform-customer-search-to-customer-cars.service';

describe('SendformCustomerSearchToCustomerCarsService', () => {
  let service: SendformCustomerSearchToCustomerCarsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendformCustomerSearchToCustomerCarsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
