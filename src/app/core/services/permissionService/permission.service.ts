import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { RolePermssionContro, RolePermissionWithDetailsDTO } from '../callAPI/api.service';

@Injectable({
providedIn: 'root',
})
export class PermissionService {

constructor(private rolePermssionContro : RolePermssionContro ) {}

  // make a request from backend and save them in local storage using this form : controller-function
  getUserPermissions(): Observable<RolePermissionWithDetailsDTO[]> {
  return this.rolePermssionContro.getPermissionsUsingRoleID().pipe(
      tap((permissions) => {
          const formattedPermissions = permissions.map(p => 
            `${p.controller?.controllerName}-${p.permission?.name}`
          );
          localStorage.setItem('permissions', JSON.stringify(formattedPermissions));
        })
      );
    }
  
  // get permissions form localstorage 
  getPermissions(): string[] {
    return JSON.parse(localStorage.getItem('permissions') || '[]');
  }

  // After getting the permissions check if required permisison match with what user has in local storage
  hasPermission(controller: string, permission: string): boolean {
    const permissions = this.getPermissions();
    return permissions.includes(`${controller}-${permission}`);
  }
}

