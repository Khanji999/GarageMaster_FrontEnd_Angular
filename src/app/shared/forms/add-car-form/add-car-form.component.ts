import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CarService } from '../../../core/services/carService/car.service';
import { EngineFuelDTO, EngineStructureDTO, VehicleBrandDTO, VehicleModelDTO } from '../../../core/services/callAPI/api.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-car-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-car-form.component.html',
  styleUrl: './add-car-form.component.scss'
})
export class AddCarFormComponent  implements OnInit {
  @Output() closeForm = new EventEmitter<void>(); 
  form!: FormGroup;
  brands: VehicleBrandDTO[] = [];
  models: VehicleModelDTO[] = [];
  engineFuels: EngineFuelDTO[] = [];
  engineStructures: EngineStructureDTO[] = [];

  constructor(private fb: FormBuilder , public carService : CarService){}

  ngOnInit(): void {
    this.form = this.fb.group({
      brand: [''],
      model: [''],
      engineFuel: [''],
      numberOfCylinders: [''],
      modelYear: [''],
    });

    this.getAllBrands();
    this.getAllengineFuels();
    this.getAllengineStructures();
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

  submitForm() {
    //here my logic to add the car 
    this.closeFormAndDestroy();
  }
  closeFormAndDestroy(): void {
    this.closeForm.emit(); 
  }

}
