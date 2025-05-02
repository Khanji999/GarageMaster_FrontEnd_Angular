import { Injectable } from '@angular/core';
import { RoleRouteContro } from '../callAPI/api.service';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor(private roleRouteContro: RoleRouteContro) { }

  // make a req to backend to get all routers
  storeRoutes():  Observable<any>  {
    return this.roleRouteContro.getAllRoutes().pipe(
      tap(
      (response: any) => {
      const routes = response.result ?? []; 
      const routeNames = routes.map((route: any) => route.route?.name);
      localStorage.setItem('routes', JSON.stringify(routeNames));
    }
  ));
  }
  
  hasAccess(routeName: string): boolean {
    const storedRoutes = localStorage.getItem('routes');
    if (!storedRoutes) return false;
    const routes = JSON.parse(storedRoutes);
    return routes.includes(routeName);
  }
}
