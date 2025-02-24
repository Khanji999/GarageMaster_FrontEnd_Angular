import { CanActivateFn } from '@angular/router';

export const noAccessBeforeLoginGuard: CanActivateFn = (route, state) => {
  return true;
};
