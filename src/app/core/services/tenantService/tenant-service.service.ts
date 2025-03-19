import { Injectable } from '@angular/core';
import {  TenantContro, TenantDTO } from '../callAPI/api.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TenantService {
  constructor(private tenantContro: TenantContro) {}

  getTenant(): Observable<TenantDTO> {
    return this.tenantContro.getCurrentTenant().pipe(
      map((response: any) => {
        return response; 
      })
    );
  }
}
