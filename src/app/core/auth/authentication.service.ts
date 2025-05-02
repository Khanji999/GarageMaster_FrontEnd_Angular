import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs'; 
import {  LoginDTO, UserContro } from '../services/callAPI/api.service';
import { Store } from '@ngrx/store';
import { PermissionService } from '../services/permissionService/permission.service';
import { RouteService } from '../services/routeService/route.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private userContro: UserContro, private router: Router , private store: Store,
    private permissionService : PermissionService ,  private routeService : RouteService
  ) { }
  
  login(userName: string, password: string): Observable<boolean> {
    const loginData: LoginDTO = new LoginDTO({ userName, password });
  
    return new Observable<boolean>(
      (observer) => {
      this.userContro.login(loginData).subscribe(
        (response: any) => {
          const token = response.result;
          if (token) {
            localStorage.setItem("token", token);
  
            // Fetch routes and permissions before completing the login
            forkJoin({
              routes: this.routeService.storeRoutes(),
              permissions: this.permissionService.getUserPermissions(),
            }).subscribe(
              ({ routes, permissions }) => {
                observer.next(true);
                observer.complete();
                this.router.navigate(['/dashboard']);
              },
              (error) => {
                console.error("Error fetching routes or permissions", error);
                observer.next(false);
                observer.complete();
              }
            );
          } else {
            observer.next(false);
            observer.complete();
          }
        },
        
        (error) => {
          console.error("Login failed", error);
          observer.next(false);
          observer.complete();
        }
      );
    });
  }

  isLoggedIn() {
    var token =  localStorage.getItem('token');
    if(token == null || token ==""){
      return false
    }
    try {
      const payloadBase64 = token.split('.')[1]; 
      const decodedPayload = JSON.parse(atob(payloadBase64)); // Decode Base64
      const currentTime = Math.floor(Date.now() / 1000);

      if (decodedPayload.exp < currentTime) {
          localStorage.removeItem('token'); // Delete expired token
          return false;
      }

      return true;
  } catch (error) {
      localStorage.removeItem('token'); // Delete invalid token
      return false;
  }
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);

  }
}
