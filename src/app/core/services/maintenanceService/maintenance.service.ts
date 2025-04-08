import { Injectable } from '@angular/core';
import { MaintenaceCardContro, MaintenaceCardDTO } from '../callAPI/api.service';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {

  constructor(private maintenanceContro: MaintenaceCardContro) { }
  
  addNewMaintenance(customerVehicleId?: number, km? :number) : Observable<MaintenaceCardDTO>{
    const cardObject = new MaintenaceCardDTO();
    let TakedateIn = new Date();
    if (isNaN(TakedateIn.getTime()) || TakedateIn < new Date(1753, 0, 1)) {
      TakedateIn = new Date(1753, 0, 1); 
    }
    cardObject.dateIn = TakedateIn; 
    cardObject.customerVehicleId = customerVehicleId;
    cardObject.kilometers = km;
    return this.maintenanceContro.add(cardObject).pipe(
      map((response: any) => {
        console.log("form backend",response.result)
        return response.result;
      }),
      catchError(error => {
        console.error('Error in addNewMaintenance:', error);
        return throwError(error);
      })
    );
  }
}
