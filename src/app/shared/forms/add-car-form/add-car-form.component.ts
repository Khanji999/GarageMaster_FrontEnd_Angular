import { Component, EventEmitter, Input, OnInit, output, Output } from '@angular/core';
import { AddNewVehicleToCustomerDTO, ColorContro, ColorDTO, CustomerVehicleContro, CustomerVehicleDTO, CustomerVehicleWithDetailsDTO, EngineChargerContro, EngineChargerDTO, EngineFuelContro, EngineFuelDTO, EngineStructureContro, EngineStructureDTO, PlateDTO, TransmissionContro, TransmissionDTO, VehicleBrandContro, VehicleBrandDTO, VehicleModelContro, VehicleModelDTO, WheelDriveContro, WheelDriveDTO } from '../../../core/services/callAPI/api.service';
import { FormBuilder, FormControl,FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GenericFormComponent } from "../../components/generic-form/generic-form.component";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-car-form',
  imports: [CommonModule, ReactiveFormsModule, GenericFormComponent],
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
  showConfirm = false;
  private pendingDTO!: AddNewVehicleToCustomerDTO;

// Related to Update :
  @Input() carData?: CustomerVehicleWithDetailsDTO | null;  
    updating?: CustomerVehicleWithDetailsDTO;
  constructor(
    private brandContro: VehicleBrandContro,
    private modelContro : VehicleModelContro ,
    private engineFuelContro : EngineFuelContro,
    private engineStructureContro : EngineStructureContro,
    private engineChargerContro : EngineChargerContro,
    private wheelDriveContro : WheelDriveContro, 
    private gearBoxContro : TransmissionContro,
    private colorContro : ColorContro,
    private fb: FormBuilder,
    private customerVehicleContro : CustomerVehicleContro,
    private toastr: ToastrService
  ){}

  ngOnInit() {
    // Build Form
  this.form = new FormGroup({
    vin: new FormControl('', Validators.required),
    brand: new FormControl('', Validators.required),
    model: new FormControl('', Validators.required),
    engineFuel: new FormControl('', Validators.required),
    gearBox: new FormControl('', Validators.required),
    engineStructure: new FormControl('', Validators.required),
    engineCharger: new FormControl('', Validators.required),
    wheelDriver: new FormControl('', Validators.required),
    color: new FormControl('', Validators.required),
    plateNumber: new FormControl('', Validators.required),
    plateLetter: new FormControl('', Validators.required),
    numberOfCylinders: new FormControl('', [Validators.required, Validators.min(1), Validators.max(16)]),
    modelYear: new FormControl('', [Validators.required, Validators.min(1886), Validators.max(new Date().getFullYear())]),
    numberOfGear: new FormControl('', [Validators.required, Validators.min(1), Validators.max(16)]),
  });
    if (this.carData) {
    this.form.get('vin')?.valueChanges.subscribe(val => {
      if (this.carData) {
        this.carData.vin = val;
      }
    });

    this.form.get('model')?.valueChanges.subscribe(val => {
      if (this.carData) {
        this.carData.vehicleModelId = val;
      }
    });

    this.form.get('engineFuel')?.valueChanges.subscribe(val => {
      if (this.carData) {
        this.carData.engineFuelId = val;
      }
    });

    this.form.get('gearBox')?.valueChanges.subscribe(val => {
      if (this.carData) {
        this.carData.transmissionId = val;
      }
    });

    this.form.get('engineStructure')?.valueChanges.subscribe(val => {
      if (this.carData) {
        this.carData.engineStructureId = val;
      }
    });

    this.form.get('engineCharger')?.valueChanges.subscribe(val => {
      if (this.carData) {
        this.carData.engineChargerId = val;
      }
    });

    this.form.get('wheelDriver')?.valueChanges.subscribe(val => {
      if (this.carData) {
        this.carData.wheelDriveId = val;
      }
    });

    this.form.get('numberOfCylinders')?.valueChanges.subscribe(val => {
      if (this.carData) {
        this.carData.numberOfCylinders = val;
      }
    });

    this.form.get('modelYear')?.valueChanges.subscribe(val => {
      if (this.carData) {
        this.carData.yearModel = val;
      }
    });

    this.form.get('numberOfGear')?.valueChanges.subscribe(val => {
      if (this.carData) {
        this.carData.transmissionGears = val;
      }
    });
    
  }
    // Patching  Data To Forms
    if(this.carData){
      this.form.patchValue({
        brand: this.carData.vehicleModel?.vehicleBrand?.id ,
      });
      if(this.carData.vehicleModel?.vehicleBrand?.id) {
        this.getAllModelsByBrandID(this.carData.vehicleModel.vehicleBrand.id);
      }
      setTimeout(() => {
        this.form.patchValue({
          model: this.carData?.vehicleModel?.id,
        });
      }, 0);
      this.form.patchValue({
        vin: this.carData.vin,
        engineFuel: this.carData.engineFuel?.id,
        gearBox: this.carData.transmission?.id,
        numberOfGear : this.carData.transmissionGears,
        engineStructure: this.carData.engineStructure?.id,
        engineCharger: this.carData.engineCharger?.id,
        wheelDriver: this.carData.wheelDrive?.id,
        color:this.carData.customerVehicleColors?.[0]?.color?.id,
        plateNumber:this.carData.customerVehiclePlates?.[0].plate?.numbers,
        plateLetter:this.carData.customerVehiclePlates?.[0].plate?.letters,
        numberOfCylinders:this.carData.numberOfCylinders,
        modelYear:this.carData.yearModel,
      });
    }
    // Get Menu Items
    this.getAllBrands();
    this.getAllengineFuels();
    this.getAllengineStructures();
    this.getAllengineCharger();
    this.getAllWheelDrive();
    this.getAllgearBox();
    this.getColors();
    this.form.get('brand')?.valueChanges.subscribe((brandId: number) => {
      if (brandId) {
        this.models = [];
        this.getAllModelsByBrandID(brandId);
      } else {
        this.models = [];
      }
    });

  }

  getAllBrands(): void {
    this.brandContro.getAll().subscribe(
      (response: any) => {
        this.brands = response.result;
      }
    );
  }
  getAllModelsByBrandID(id :number): void {
    this.modelContro.getAllModelsByBrandID(id).subscribe(
      (response: any) => {
        this.models = response.result;
      }
    );
  }
  getAllengineFuels(): void {
  this.engineFuelContro.getAll().subscribe(
      (response: any) => {
        this.engineFuels = response.result;
      }
    );
  }
  getAllengineStructures(): void {
    this.engineStructureContro.getAll().subscribe(
      (response: any) => {
        this.engineStructures = response.result;
      }
    );
  }
  getAllengineCharger(): void {
    this.engineChargerContro.getAll().subscribe(
      (response: any) => {
        this.engineChargers = response.result;
      }
    );
  }
  getAllgearBox(): void {
    this.gearBoxContro.getAll().subscribe(
      (response: any) => {
        this.gearbox = response.result;
      }
    );
  }
  getColors(): void {
    this.colorContro.getAll().subscribe(
      (response: any) => {
        this.colors = response.result;
      }
    );
  }
  getAllWheelDrive(): void {
    this.wheelDriveContro.getAll().subscribe(
      (response: any) => {
        this.wheelDrivers = response.result;
      }
    );
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    }
    // get value from the Form to Save new Object in Backend
    if (this.form.valid && this.carData == null) {
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

    }
    else if (this.form.valid && this.carData != null){
      this.customerVehicleContro.updateVehicle(this.carData).subscribe(
        (response) => {
          this.closeFormAndDestroy();
        }
      )   
    }
  }

  closeFormAndDestroy(): void {
    this.closeForm.emit(); 
  }

}