import { Injectable } from '@angular/core';
import { EngineChargerContro, EngineChargerDTO, EngineFuelContro, EngineFuelDTO, EngineStructureContro, EngineStructureDTO, VehicleBrandContro, VehicleBrandDTO, VehicleModelContro, VehicleModelDTO, WheelDriveContro } from '../callAPI/api.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private brandContro : VehicleBrandContro ,
              private modelContro : VehicleModelContro ,
              private engineFuelContro : EngineFuelContro,
              private engineStructureContro : EngineStructureContro,
              private engineChargerContro : EngineChargerContro,
              private wheelDriveContro : WheelDriveContro

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
  getAllEngineCharger(): Observable<[EngineChargerDTO]>{
      return this.engineChargerContro.getAll().pipe(
        map((response: any) => {
          return response.result;
        })
      );
    }
    getAllWheelDrive(): Observable<[EngineChargerDTO]>{
      return this.wheelDriveContro.getAll().pipe(
        map((response: any) => {
          return response.result;
        })
      );
    }
}
