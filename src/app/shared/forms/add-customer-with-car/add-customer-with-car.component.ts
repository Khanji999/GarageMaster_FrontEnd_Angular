import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GenericFormComponent } from "../../components/generic-form/generic-form.component";
import { OpenConfirmationDialogGenericComponent } from "../../components/open-confirmation-dialog-generic/open-confirmation-dialog-generic.component";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddNewVehicleToCustomerDTO, ColorContro, ColorDTO, CustomerContro, CustomerDTO, CustomerVehicleContro, CustomerVehicleDTO, CustomerVehicleWithDetailsDTO, EngineChargerContro, EngineChargerDTO, EngineFuelContro, EngineFuelDTO, EngineStructureContro, EngineStructureDTO, PlateDTO, TransmissionContro, TransmissionDTO, VehicleBrandContro, VehicleBrandDTO, VehicleModelContro, VehicleModelDTO, WheelDriveContro, WheelDriveDTO } from '../../../core/services/callAPI/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-customer-with-car',
  imports: [GenericFormComponent ,ReactiveFormsModule , CommonModule],
  templateUrl: './add-customer-with-car.component.html',
  styleUrl: './add-customer-with-car.component.scss'
})
export class AddCustomerWithCarComponent implements OnInit{
  car? : AddNewVehicleToCustomerDTO;
  form!: FormGroup;
  customers : CustomerDTO[] = [];
  brands: VehicleBrandDTO[] = [];
  models: VehicleModelDTO[] = [];
  colors : ColorDTO[] = [];
  engineFuels: EngineFuelDTO[] = [];
  engineStructures: EngineStructureDTO[] = [];
  engineChargers : EngineChargerDTO[] = [];
  wheelDrivers : WheelDriveDTO [] = [];
  gearbox : TransmissionDTO [] = [];
  @Output() closeForm = new EventEmitter<void>(); 
  @Output() added = new EventEmitter<void>(); 
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
    private customerContro : CustomerContro,
    private customerVehicleContro : CustomerVehicleContro,
    private toastr: ToastrService
  ){}

  ngOnInit(): void {
    if(this.carData == null){  
      this.car = new AddNewVehicleToCustomerDTO();
      this.car.customerVehicle = new CustomerVehicleDTO();
      this.car.plate = new PlateDTO();
    }
  this.form = new FormGroup({
    customerId: new FormControl('', Validators.required),
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

  this.form.get('customerId')?.valueChanges.subscribe(val => {
      if (this.carData) {
        this.carData.customerId = val;
      }
      else{
        this.car!.customerVehicle!.customerId = val
      }
    });
  this.form.get('vin')?.valueChanges.subscribe(val => {
      if (this.carData) {
        this.carData.vin = val;
      }
      else{
        this.car!.customerVehicle!.vin = val
      }
    });

    this.form.get('model')?.valueChanges.subscribe(val => {
      if (this.carData) {
        this.carData.vehicleModelId = val;
      } 
      else{
        this.car!.customerVehicle!.vehicleModelId = val
      }
    });

    this.form.get('engineFuel')?.valueChanges.subscribe(val => {
      if (this.carData) {
        this.carData.engineFuelId = val;
      }
      else{
        this.car!.customerVehicle!.engineFuelId = val
      }
    });

    this.form.get('gearBox')?.valueChanges.subscribe(val => {
      if (this.carData) {
        this.carData.transmissionId = val;
      }
      else{
        this.car!.customerVehicle!.transmissionId = val
      }
    });

    this.form.get('engineStructure')?.valueChanges.subscribe(val => {
      if (this.carData) {
        this.carData.engineStructureId = val;
      }
      else{
        this.car!.customerVehicle!.engineStructureId = val
      }
    });

    this.form.get('engineCharger')?.valueChanges.subscribe(val => {
      if (this.carData) {
        this.carData.engineChargerId = val;
      }
      else{
        this.car!.customerVehicle!.engineChargerId = val
      }
    });

    this.form.get('wheelDriver')?.valueChanges.subscribe(val => {
      if (this.carData) {
        this.carData.wheelDriveId = val;
      }
      else{
        this.car!.customerVehicle!.wheelDriveId = val
      }
    });

    this.form.get('numberOfCylinders')?.valueChanges.subscribe(val => {
      if (this.carData) {
        this.carData.numberOfCylinders = val;
      }
      else{
        this.car!.customerVehicle!.numberOfCylinders = val
      }
    });

    this.form.get('modelYear')?.valueChanges.subscribe(val => {
      if (this.carData) {
        this.carData.yearModel = val;
      }
      else{
        this.car!.customerVehicle!.yearModel = val
      }
    });

    this.form.get('numberOfGear')?.valueChanges.subscribe(val => {
      if (this.carData) {
        this.carData.transmissionGears = val;
      }
      else{
        this.car!.customerVehicle!.transmissionGears = val
      }
    });
    this.form.get('color')?.valueChanges.subscribe(val => {
      this.car!.colorID = val
    });
    this.form.get('plateNumber')?.valueChanges.subscribe(val => {
      this.car!.plate!.numbers = val
    });
    this.form.get('plateLetter')?.valueChanges.subscribe(val => {
      this.car!.plate!.letters = val
    });
     // Patching  Data To Forms
    if(this.carData){
      this.form.patchValue({
        customerId: this.carData.customerId ,
      });
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
    this.getallCustomers();
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

  getallCustomers() : void{
    this.customerContro.getAll().subscribe(
      (response) => {
        this.customers = response.result!;
      }
    )
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

  closeMenu(): void {
    this.closeForm.emit(); 
  }
  submit() {
    if(!this.carData){
      this.customerVehicleContro.addNewVehicleToCustomer(this.car).subscribe(
        (response) => {
          if(response.statusCode == 200){
            this.toastr.success("Car Was Added");
            this.added.emit();
            this.closeMenu();
          }
        }
      ) 
    }
    else{
      this.customerVehicleContro.updateVehicle(this.carData).subscribe(
        (rsponse) => {
          this.toastr.success("Car Was Updated");
          this.added.emit();
          this.closeMenu();
        }
      )
    }
  }

}
