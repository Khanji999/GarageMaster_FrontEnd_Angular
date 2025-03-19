import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../auth/authentication.service';

export const noAccessBeforeLoginGuard: CanActivateFn = (route, state) => {
  const authenticationService = inject(AuthenticationService)
  const router = inject(Router)

// Protect pages like dashboard , user must login before access them

  if(authenticationService.isLoggedIn()){
    return true; // can access
}
  else
  // cannot access go to login
    router.navigateByUrl('/login')
    return false;
};
