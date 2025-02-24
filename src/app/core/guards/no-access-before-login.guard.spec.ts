import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { noAccessBeforeLoginGuard } from './no-access-before-login.guard';

describe('noAccessBeforeLoginGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => noAccessBeforeLoginGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
