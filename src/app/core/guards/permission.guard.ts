// import { inject } from '@angular/core';
// import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
// import { PermissionService } from '../services/permissionService/permission.service';

// export const PermissionGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

//     const permissionService = inject(PermissionService);
//     const router = inject(Router);

//     const requiredPermission = route.data['permission']; 
//     if (!requiredPermission) {
//         return true; 
//     }

//     const [controller, permission] = requiredPermission.split('-'); 
//     if (permissionService.hasPermission(controller, permission)) {
//         return true; 
//     }

//     router.navigateByUrl('/AccessDenied'); 
//     return false;
// };
