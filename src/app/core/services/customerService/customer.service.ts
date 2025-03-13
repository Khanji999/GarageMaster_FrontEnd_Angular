import { Injectable } from '@angular/core';
import { Client, CustomerDTO, CustomerVehicleDTO, CustomerVehicleWithDetailsDTO } from '../callAPI/api.service';
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

    getCustomerVehicles(id : number): Observable<CustomerVehicleWithDetailsDTO[]> {
      return this.client.getAllCustomerVehicles(id).pipe(
        map((response: any) => {
          console.log(response); 
          return response; 
        })
      );
    }

    getCustomerByFirstName(name: string): Observable<CustomerDTO[]> {
      return this.client.searchForCustomerByFirstName(name).pipe(
        map((response: any) => {
          return response; 
        })
      );
    }

    getCustomerByLastName(name: string): Observable<CustomerDTO[]> {
      return this.client.searchForCustomerByLastName(name).pipe(
        map((response: any) => {
          return response; 
        })
      );
    }
        
    getCustomerByFirstAndLastName(name: string,nameL:string): Observable<CustomerDTO[]> {
      return this.client.searchForCustomerByFirstAndLastName(name,nameL).pipe(
        map((response: any) => {
          return response; 
        })
      );
    }
}
