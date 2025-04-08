import { inject, Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateFn } from '@angular/router';
import { RouteService } from '../services/routeService/route.service';

export const RouteGuard : CanActivateFn = (route, state) => {
    const routeService = inject(RouteService);
    const router = inject(Router);

    const routeName = route.routeConfig?.path; 

    if (routeName && routeService.hasAccess(routeName)) {
        return true; 
    }
    
    router.navigate(['/AccessDenied']); 
    return false;
};
    

