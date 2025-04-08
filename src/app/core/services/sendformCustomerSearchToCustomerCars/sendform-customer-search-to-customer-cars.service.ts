import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendformCustomerSearchToCustomerCarsService {
  
  private storedData: any = null;

  constructor() {}

  setData(data: any) {
    this.storedData = data;
  }

  getData() {
    return this.storedData;
  }
}
