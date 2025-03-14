import { Injectable } from '@angular/core';
import { EngineFuelContro, EngineFuelDTO, EngineStructureContro, EngineStructureDTO, VehicleBrandContro, VehicleBrandDTO, VehicleModelContro, VehicleModelDTO } from '../callAPI/api.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private brandContro : VehicleBrandContro ,
              private modelContro : VehicleModelContro ,
              private engineFuelContro : EngineFuelContro,
              private engineStructureContro : EngineStructureContro
  ) { }

    getBrands(): Observable<[VehicleBrandDTO]> {
      return this.brandContro.getAll().pipe(
        map((response: any) => {
          return response.result;
        })
      );
    }
    getModelsByBrandID(brandId :number): Observable<[VehicleModelDTO]>{
      return this.modelContro.getAllModelsByBrandID(brandId).pipe(
        map((response: any) => {
          return response;
        })
      );
    }
    getEngineFuels(): Observable<[EngineFuelDTO]>{
      return this.engineFuelContro.getAll().pipe(
        map((response: any) => {
          return response.result;
        })
      );
    }
    getEngineStructures(): Observable<[EngineStructureDTO]>{
      return this.engineStructureContro.getAll().pipe(
        map((response: any) => {
          return response.result;
        })
      );
    }
}
