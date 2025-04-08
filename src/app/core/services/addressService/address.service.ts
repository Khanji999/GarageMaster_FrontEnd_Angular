import { Injectable } from '@angular/core';
import { CityContro, CityDTO, CountryContro, CountryDTO, DistrictContro, DistrictDTO, StreetContro, StreetDTO } from '../callAPI/api.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private countryContro : CountryContro,
              private cityContro : CityContro,
              private districtContro : DistrictContro,
              private streetContro : StreetContro
  ) { }

  getAllCountries() : Observable<[CountryDTO]>{
    return this.countryContro.getAll().pipe(
      map((response: any) => {
        return response.result;
      })
    );
  }
  
  getAllCities(countryID :number) : Observable<[CityDTO]>{
    return this.cityContro.getAllCitiesByCountryID(countryID).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getAllDistrictsByCityID(CityID : number) : Observable<[DistrictDTO]>{
    return this.districtContro.getAllDistictsByCityID(CityID).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  getAllStreetsByDistrictID(DistrictID : number) : Observable<[StreetDTO]>{
    return this.streetContro.getStreetsByDistrictID(DistrictID).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
}
