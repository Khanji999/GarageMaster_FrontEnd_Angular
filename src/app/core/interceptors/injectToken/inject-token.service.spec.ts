import { TestBed } from '@angular/core/testing';

import { InjectTokenService } from './inject-token.service';

describe('InjectTokenService', () => {
  let service: InjectTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InjectTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
