import { TestBed } from '@angular/core/testing';

import { PorgressBarService } from './porgress-bar.service';

describe('PorgressBarService', () => {
  let service: PorgressBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PorgressBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
