import { Injectable } from '@angular/core';
import { RoleRouteContro } from '../callAPI/api.service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor(private roleRouteContro: RoleRouteContro) { }

  // make a req to backend to get all routers
  getRoutes(): Observable<any> {
    return this.roleRouteContro.getAllRoutes().pipe(
      tap((routes) => {
        localStorage.setItem('routes', JSON.stringify(routes.map(r => r.route?.name)));
      })
    );
  }

  
  hasAccess(routeName: string): boolean {
    const storedRoutes = localStorage.getItem('routes');
    if (!storedRoutes) return false;
    const routes = JSON.parse(storedRoutes);
    return routes.includes(routeName);
  }
}
