import { Component, EventEmitter, OnInit, output, Output } from '@angular/core';
import { CarService } from '../../../core/services/carService/car.service';
import { AddNewVehicleToCustomerDTO, ColorDTO, CustomerVehicleDTO, CustomerVehicleWithDetailsDTO, EngineChargerDTO, EngineFuelDTO, EngineStructureDTO, PlateDTO, TransmissionDTO, VehicleBrandDTO, VehicleModelDTO, WheelDriveDTO } from '../../../core/services/callAPI/api.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-car-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-car-form.component.html',
  styleUrl: './add-car-form.component.scss'
})
export class AddCarFormComponent  implements OnInit {
  @Output() closeForm = new EventEmitter<void>(); 
  @Output() submitForm = new EventEmitter<AddNewVehicleToCustomerDTO>(); 
  form!: FormGroup;
  brands: VehicleBrandDTO[] = [];
  models: VehicleModelDTO[] = [];
  colors : ColorDTO[] = [];
  engineFuels: EngineFuelDTO[] = [];
  engineStructures: EngineStructureDTO[] = [];
  engineChargers : EngineChargerDTO[] = [];
  wheelDrivers : WheelDriveDTO [] = [];
  gearbox : TransmissionDTO [] = [];


  constructor(private fb: FormBuilder , public carService : CarService){}

  ngOnInit(): void {
    this.form = this.fb.group({
      vin: ['', Validators.required],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      engineFuel: ['', Validators.required],
      gearBox: ['', Validators.required],
      engineStructure: ['', Validators.required],
      engineCharger: ['',Validators.required],
      wheelDriver: ['', Validators.required],
      color:['', Validators.required],
      plateNumber:['', Validators.required],
      plateLetter:['', Validators.required],
      numberOfCylinders: ['', [Validators.required, Validators.min(1), Validators.max(16)]],
      modelYear: ['',[Validators.required, Validators.min(1886), Validators.max(new Date().getFullYear())]],
      numberOfGear : ['', [Validators.required, Validators.min(1), Validators.max(16)]],
    });

    this.getAllBrands();
    this.getAllengineFuels();
    this.getAllengineStructures();
    this.getAllengineCharger();
    this.getAllWheelDrive();
    this.getAllgearBox();
    this.getColors();

    this.form.get('brand')?.valueChanges.subscribe((brandId: number) => {
      if (brandId) {
        this.getAllModelsByBrandID(brandId);
      } else {
        this.models = [];
      }
    });
  }

  getAllBrands(): void {
    this.carService.getBrands().subscribe(
      (response) => {
        this.brands = response;
      },
      (error) => {
        console.error('Error fetching brands:', error);
      }
    );
  }

  getAllModelsByBrandID(id :number): void {
    this.carService.getModelsByBrandID(id).subscribe(
      (response) => {
        this.models = response;
      },
      (error) => {
        console.error('Error fetching models:', error);
      }
    );
  }

  getAllengineFuels(): void {
    this.carService.getEngineFuels().subscribe(
      (response) => {
        this.engineFuels = response;
      },
      (error) => {
        console.error('Error fetching models:', error);
      }
    );
  }

  getAllengineStructures(): void {
    this.carService.getEngineStructures().subscribe(
      (response) => {
        this.engineStructures = response;
      },
      (error) => {
        console.error('Error fetching models:', error);
      }
    );
  }

  getAllengineCharger(): void {
    this.carService.getAllEngineCharger().subscribe(
      (response) => {
        this.engineChargers = response;
      },
      (error) => {
        console.error('Error fetching models:', error);
      }
    );
  }

  getAllgearBox(): void {
    this.carService.getAllGearBox().subscribe(
      (response) => {
        this.gearbox = response;
      },
      (error) => {
        console.error('Error fetching models:', error);
      }
    );
  }

  getColors(): void {
    this.carService.getAllColors().subscribe(
      (response) => {
        this.colors = response;
      },
      (error) => {
        console.error('Error fetching Colors:', error);
      }
    );
  }

  getAllWheelDrive(): void {
    this.carService.getAllWheelDrive().subscribe(
      (response) => {
        this.wheelDrivers = response;
      },
      (error) => {
        console.error('Error fetching models:', error);
      }
    );
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    }
    if (this.form.valid) {
      const dtoRequest = new AddNewVehicleToCustomerDTO();

      dtoRequest.customerVehicle = new CustomerVehicleDTO();
      dtoRequest.plate = new PlateDTO();

      dtoRequest.colorID =  this.form.value.color;

      dtoRequest.customerVehicle.vehicleModelId = this.form.value.model ;
      dtoRequest.customerVehicle.engineStructureId = this.form.value.engineStructure ;
      dtoRequest.customerVehicle.engineFuelId = this.form.value.engineFuel ;
      dtoRequest.customerVehicle.engineChargerId = this.form.value.engineCharger ;
      dtoRequest.customerVehicle.wheelDriveId = this.form.value.wheelDriver ;
      dtoRequest.customerVehicle.vin = this.form.value.vin ;
      dtoRequest.customerVehicle.transmissionId = this.form.value.gearBox;
      dtoRequest.customerVehicle.yearModel = this.form.value.modelYear ;
      dtoRequest.customerVehicle.transmissionGears = this.form.value.numberOfGear ;
      dtoRequest.customerVehicle.numberOfCylinders = this.form.value.numberOfCylinders ;

      dtoRequest.plate.numbers = this.form.value.plateNumber;
      dtoRequest.plate.letters = this.form.value.plateLetter;
  
      this.submitForm.emit(dtoRequest); 
      this.closeFormAndDestroy();  
    }
  }

  closeFormAndDestroy(): void {
    this.closeForm.emit(); 
  }

}