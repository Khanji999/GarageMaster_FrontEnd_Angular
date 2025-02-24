import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../auth/authentication.service';
import { inject } from '@angular/core';

export const noAccessAfterLoginGuard: CanActivateFn = (route, state) => {
  const authenticationService = inject(AuthenticationService)
  const router = inject(Router)

  // user cannot go back to login page after login 

  if (authenticationService.isLoggedIn()) {
    // if user has token return dashboard and return false so can not access page .
    // this will be used for for any page can user visit before login 
    router.navigateByUrl('/dashboard'); 
    return false;
  }
  return true; 
};
