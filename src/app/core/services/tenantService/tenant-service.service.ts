import { Injectable } from '@angular/core';
import { Client, TenantDTO } from '../callAPI/api.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TenantService {
  constructor(private client: Client) {}

  getTenant(): Observable<TenantDTO> {
    return this.client.getCurrentTenant().pipe(
      map((response: any) => {
        return response; 
      })
    );
  }
}
