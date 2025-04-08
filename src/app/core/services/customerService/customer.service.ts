import { Injectable } from '@angular/core';
import {  AddNewCustomerDTO, CustomerContactNumberContro, CustomerContactNumberDTO, CustomerContro, CustomerDTO, CustomerUserContro, CustomerVehicleContro, CustomerVehicleWithDetailsDTO, UserDTO } from '../callAPI/api.service';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private customerContro :  CustomerContro,
              private customerVehicleContro : CustomerVehicleContro,
              private customerUserContro : CustomerUserContro,
              private customerContactNumberContro : CustomerContactNumberContro
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

  addNewCustomer(Customer: AddNewCustomerDTO) : Observable<UserDTO>{
    return this.customerUserContro.addNewCustomer(Customer).pipe(
      map(
        (response :any)=> {
          return response.result; 
        }
      )
    )
  }
// this fucntion is used to get the customer phonenumber ;  you know the customer 
// but you dont know his phonenumber
  getCustomerPhoneNumber(customerID: number): Observable<CustomerContactNumberDTO>{
    return this.customerContactNumberContro.getCustomerPhoneNumber(customerID).pipe(
      map((response: any) => {
        return response; 
      })
    );
  }
  
  ByPhoneNumberGetCustomer(phonenumber: string): Observable<CustomerDTO[]> {
    return this.customerContro.searchForCustomerByPhoneNumber(phonenumber).pipe(
      map((response: CustomerDTO | null) => {
        return response ? [response] : []; 
      })
    );
  }
}
