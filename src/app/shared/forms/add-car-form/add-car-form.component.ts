import { Component, EventEmitter, Input, OnInit, output, Output } from '@angular/core';
import { AddNewVehicleToCustomerDTO, ColorContro, ColorDTO, CustomerVehicleContro, CustomerVehicleDTO, CustomerVehicleWithDetailsDTO, EngineChargerContro, EngineChargerDTO, EngineFuelContro, EngineFuelDTO, EngineStructureContro, EngineStructureDTO, PlateDTO, TransmissionContro, TransmissionDTO, VehicleBrandContro, VehicleBrandDTO, VehicleModelContro, VehicleModelDTO, WheelDriveContro, WheelDriveDTO } from '../../../core/services/callAPI/api.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GenericFormComponent } from "../../components/generic-form/generic-form.component";
import { OpenConfirmationDialogGenericComponent } from "../../components/open-confirmation-dialog-generic/open-confirmation-dialog-generic.component";

@Component({
  selector: 'app-add-car-form',
  imports: [CommonModule, ReactiveFormsModule, GenericFormComponent,OpenConfirmationDialogGenericComponent],
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
  ){}

  ngOnInit() {
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
  
      this.pendingDTO= dtoRequest
      this.showConfirm = true;   
    }
  }

  closeFormAndDestroy(): void {
    this.closeForm.emit(); 
  }

  onConfirm() {
    if (this.pendingDTO) {
      console.log("Sending DTO:", this.pendingDTO);
      this.submitForm.emit(this.pendingDTO);
      this.closeFormAndDestroy();
    }
    this.showConfirm = false;
  }
  
  onCancel() {
    this.showConfirm = false;
    this.pendingDTO = undefined!;
  }
}