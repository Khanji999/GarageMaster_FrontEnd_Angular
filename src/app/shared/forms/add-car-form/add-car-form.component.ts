import { Component, EventEmitter, OnInit, output, Output } from '@angular/core';
import { CarService } from '../../../core/services/carService/car.service';
import { CustomerVehicleDTO, EngineChargerDTO, EngineFuelDTO, EngineStructureDTO, VehicleBrandDTO, VehicleModelDTO, WheelDriveDTO } from '../../../core/services/callAPI/api.service';
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
  @Output() submitForm = new EventEmitter<CustomerVehicleDTO>(); 
  form!: FormGroup;
  brands: VehicleBrandDTO[] = [];
  models: VehicleModelDTO[] = [];
  engineFuels: EngineFuelDTO[] = [];
  engineStructures: EngineStructureDTO[] = [];
  engineChargers : EngineChargerDTO[] = [];
  wheelDrivers : WheelDriveDTO [] = [];

  constructor(private fb: FormBuilder , public carService : CarService){}

  ngOnInit(): void {
      this.form = this.fb.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
      engineFuel: ['', Validators.required],
      engineCharger: ['', Validators.required],
      wheelDriver: ['', Validators.required],
      numberOfCylinders: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
      modelYear: ['', [Validators.required, Validators.pattern("^[0-9]{4}$")]]
    });

    this.getAllBrands();
    this.getAllengineFuels();
    this.getAllengineStructures();
    this.getAllengineCharger();
    this.getAllWheelDrive();
    this.form.get('brand')?.valueChanges.subscribe((brandId: number) => {
      if (brandId) {
        this.getAllModelsByBrandID(brandId);
      } else {
        this.models = [];
      }
    });
  }
  // Make calls
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
    if (this.form.valid) {
      console.log("Form Component" + this.form.value)
      this.submitForm.emit(this.form.value); 
      this.closeForm.emit();  
    }
  }

  closeFormAndDestroy(): void {
    this.closeForm.emit(); 
  }

}
