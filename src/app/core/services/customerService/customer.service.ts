import { Injectable } from '@angular/core';
import { Client, CustomerDTO, CustomerVehicleDTO } from '../callAPI/api.service';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private client :  Client) { }

    getCustomerBySeaching(name: string): Observable<CustomerDTO[]> {
      return this.client.searchForCustomer(name).pipe(
        map((response: any) => {
          return response; 
        })
      );
    }

    getCustomerVehicles(id : number): Observable<CustomerVehicleDTO[]> {
      return this.client.getAllCustomerVehicles(id).pipe(
        map((response: any) => {
          console.log(response)
          return response; 
        })
      );
    }
}
