import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { noAccessAfterLoginGuard } from './no-access-after-login.guard';

describe('noAccessAfterLoginGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => noAccessAfterLoginGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
