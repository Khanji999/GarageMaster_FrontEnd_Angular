import { CanActivateFn } from '@angular/router';

export const noAccessAfterLoginGuard: CanActivateFn = (route, state) => {
  return true;
};
