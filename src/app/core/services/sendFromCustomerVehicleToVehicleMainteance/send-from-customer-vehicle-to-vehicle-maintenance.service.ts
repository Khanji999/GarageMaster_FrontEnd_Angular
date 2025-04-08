import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SendFromCustomerVehicleToVehicleMaintenanceService {

  private storedData: any ;
  private storedDate_1: any;
  constructor() {}

  setData(data: any) {
    this.storedData = data;
  }
  setData_1(data: any) {
    this.storedDate_1 = data;
  }

  getData() {
    return this.storedData;
  }
  
  getData_1() {
    return this.storedDate_1;
  }
  
}
