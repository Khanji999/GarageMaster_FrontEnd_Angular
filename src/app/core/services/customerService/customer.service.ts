import { Injectable } from '@angular/core';
import {  CustomerContro, CustomerDTO, CustomerVehicleContro, CustomerVehicleDTO, CustomerVehicleWithDetailsDTO } from '../callAPI/api.service';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private customerContro :  CustomerContro,
              private customerVehicleContro : CustomerVehicleContro
  ) { }

    getCustomerBySeaching(name: string): Observable<CustomerDTO[]> {
      return this.customerContro.searchForCustomer(name).pipe(
        map((response: any) => {
          return response; 
        })
      );
    }

    getCustomerVehicles(id : number): Observable<CustomerVehicleWithDetailsDTO[]> {
      return this.customerVehicleContro.getAllCustomerVehicles(id).pipe(
        map((response: any) => {
          console.log(response); 
          return response; 
        })
      );
    }

    getCustomerByFirstName(name: string): Observable<CustomerDTO[]> {
      return this.customerContro.searchForCustomerByFirstName(name).pipe(
        map((response: any) => {
          return response; 
        })
      );
    }

    getCustomerByLastName(name: string): Observable<CustomerDTO[]> {
      return this.customerContro.searchForCustomerByLastName(name).pipe(
        map((response: any) => {
          return response; 
        })
      );
    }
        
    getCustomerByFirstAndLastName(name: string,nameL:string): Observable<CustomerDTO[]> {
      return this.customerContro.searchForCustomerByFirstAndLastName(name,nameL).pipe(
        map((response: any) => {
          return response; 
        })
      );
    }
    addNewVehicleToSpecificCusomer(vehicleDTO : CustomerVehicleDTO) :Observable<CustomerVehicleDTO>{
      return this.customerVehicleContro.add(vehicleDTO).pipe(
        map((response: any) => {
          return response; 
        })
      );
    }
}
