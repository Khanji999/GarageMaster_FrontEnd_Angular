import { Injectable } from '@angular/core';
import { Client, EngineStructureDTO, VehicleBrandDTO, VehicleEngineDTO, VehicleModelDTO } from '../callAPI/api.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private client : Client) { }

    getBrands(): Observable<[VehicleBrandDTO]> {
      return this.client.getAll41().pipe(
        map((response: any) => {
          return response.result;
        })
      );
    }
    getModelsByBrandID(brandId :number): Observable<[VehicleModelDTO]>{
      return this.client.getAllModelsByBrandID(brandId).pipe(
        map((response: any) => {
          return response;
        })
      );
    }
    getEngineFuels(): Observable<[VehicleEngineDTO]>{
      return this.client.getAll().pipe(
        map((response: any) => {
          return response.result;
        })
      );
    }
    getEngineStructures(): Observable<[EngineStructureDTO]>{
      return this.client.getAll17().pipe(
        map((response: any) => {
          return response.result;
        })
      );
    }
}
