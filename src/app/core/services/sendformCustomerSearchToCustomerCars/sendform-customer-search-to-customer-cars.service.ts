import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendformCustomerSearchToCustomerCarsService {
  // private dataSource = new BehaviorSubject<any>(null);
  // currentData = this.dataSource.asObservable();
  // constructor() { }
  // changeData(data: any) {
  //   this.dataSource.next(data);
  // }

  private storedData: any = null;

  constructor() {}

  setData(data: any) {
    this.storedData = data;
  }

  getData() {
    return this.storedData;
  }
}
