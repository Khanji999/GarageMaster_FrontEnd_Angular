import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Observable, of, debounceTime, switchMap, distinctUntilChanged } from 'rxjs';
import { CustomerDTO, CustomerVehicleDTO, CustomerVehicleWithDetailsDTO } from '../../../core/services/callAPI/api.service';
import { CustomerService } from '../../../core/services/customerService/customer.service';
import { CommonModule } from '@angular/common';
import { GenericTableComponent } from "../../components/generic-table/generic-table.component";
import { AddCarFormComponent } from "../../forms/add-car-form/add-car-form.component";

@Component({
  selector: 'app-add-maintenance',
  imports: [CommonModule, ReactiveFormsModule, GenericTableComponent, AddCarFormComponent],
  templateUrl: './add-maintenance.component.html',
  styleUrl: './add-maintenance.component.scss',
})export class AddMaintenanceComponent implements OnInit {

  columns = [
    { header: 'Brand', key: 'vehicleModel.vehicleBrand.name' },
    { header: 'Model', key: 'vehicleModel.name' },
    { header: 'Year', key: 'yearModel' },
    { header: 'Engine Cylinders', key: 'vehicleEngine.numberOfCylinders' },
    { header: 'Engine Type', key: 'vehicleEngine.engineStructure.engineType' },
    { header: 'Fuel Type', key: 'vehicleEngine.engineFuel.engineFuelType' },
    { header: 'Color', key: 'customerVehicleColors.0.color.name' },
    { header: 'Plate', key: 'customerVehiclePlates.0.plate.number' }
  ];
  form!: FormGroup;
  customers$: Observable<CustomerDTO[]> = of([]);
  vehicles? : CustomerVehicleWithDetailsDTO[]
  selectedCustomer: CustomerDTO | null = null;
  selectedVehicle: CustomerVehicleWithDetailsDTO | null = null;
  isProgrammaticUpdate = false;
  flagCar?: boolean;
  flagCustomer = false;
  isTableVisible = true;
  isFormOpen = false;
  
  constructor(
    private formBuilder: FormBuilder,
    public customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      phoneNumber: [''],
      customerVehicle: [''],
    });

    this.customers$ = this.form.valueChanges.pipe(
      debounceTime(340), 
      distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)), 
      switchMap(({ firstName, lastName }) => {
        if (this.isProgrammaticUpdate) {
          this.isProgrammaticUpdate = false;
          this.flagCustomer = false;
          return of([]);
        }
        this.flagCustomer = true;
        if (firstName?.length > 2 && lastName?.length > 2) {
          return this.customerService.getCustomerByFirstAndLastName(firstName, lastName);
        }

        if (!firstName && lastName?.length > 2) {
          return this.customerService.getCustomerByLastName(lastName);
        }
        if (firstName?.length > 2 && !lastName) {
          return this.customerService.getCustomerByFirstName(firstName);
        }
        else{
          this.flagCustomer=false
          return of([]); 
        }
      })
    );
  }

  onSelectCustomer(customer: CustomerDTO): void {
    this.isProgrammaticUpdate = true; // stop showing list of customer , can not block the listener because I need it For make search again.
    this.selectedCustomer = customer; 
    this.form.controls['firstName'].setValue(customer.firstName);
    this.form.controls['lastName'].setValue(customer.lastName);
    this.fetchCustomerVehicles();
  }

  fetchCustomerVehicles(): void {
    this.isTableVisible = true;
    if (this.selectedCustomer?.id) {
      this.customerService.getCustomerVehicles(this.selectedCustomer.id).subscribe(
        (response: CustomerVehicleWithDetailsDTO[]) => {
          this.vehicles =  response
          this.flagCar = true; // show Add Car button after selecting a Customer 
        },
        (error) => {
          console.error('Error fetching vehicles:', error);
        }
      );
    }
  }

  removeSearch(){
    this.vehicles = undefined
    this.selectedVehicle = null
    this.selectedCustomer = null
    this.form.reset(); 
  }

  handleRowSelection(selectedRow: any) {
    this.selectedVehicle = selectedRow;
    this.isTableVisible = false;
  }
  
  changeCar(){
    this.selectedVehicle = null;
    this.isTableVisible = true;
  }

  openFormToAddCar(){
    this.isFormOpen = true;
  }
}