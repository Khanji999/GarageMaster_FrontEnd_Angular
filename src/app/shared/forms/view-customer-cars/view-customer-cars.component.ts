import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddNewVehicleToCustomerDTO, CustomerDTO, CustomerVehicleDTO, CustomerVehicleWithDetailsDTO, MaintenaceCardDTO } from '../../../core/services/callAPI/api.service';
import { CommonModule } from '@angular/common';
import { GenericTableComponent } from "../../components/generic-table/generic-table.component";
import { AddCarFormComponent } from "../add-car-form/add-car-form.component";
import { CustomerService } from '../../../core/services/customerService/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SendformCustomerSearchToCustomerCarsService } from '../../../core/services/sendformCustomerSearchToCustomerCars/sendform-customer-search-to-customer-cars.service';
import { PermissionService } from '../../../core/services/permissionService/permission.service';
import { CarService } from '../../../core/services/carService/car.service';
import { SendFromCustomerVehicleToVehicleMaintenanceService } from '../../../core/services/sendFromCustomerVehicleToVehicleMainteance/send-from-customer-vehicle-to-vehicle-maintenance.service';
import { MaintenanceService } from '../../../core/services/maintenanceService/maintenance.service';

@Component({
    selector: 'app-view-customer-cars',
    imports: [CommonModule, AddCarFormComponent, GenericTableComponent, ReactiveFormsModule],
    templateUrl: './view-customer-cars.component.html',
    styleUrl: './view-customer-cars.component.scss'
})
export class ViewCustomerCarsComponent  implements OnInit{

//  related To Permissions
    viewCustomerCars = false
    viewAddCar = false;
    viewActionColumn = false;
    viewUpdateButton = false;
    viewDeleteButton = false;
//
    comingData? : CustomerDTO ;
    customerID!: number;
    customerFirstName?: string;
    customerLastName?: string ;
    columns = [
    { header: 'Brand', key: 'vehicleModel.vehicleBrand.name' },
    { header: 'Model', key: 'vehicleModel.name' },
    { header: 'Year', key: 'yearModel' },
    { header: 'Color', key: 'customerVehicleColors.0.color.name' },
    { header: 'Plate-Number', key: 'customerVehiclePlates.0.plate.numbers' },
    { header: 'Plate-Letters', key: 'customerVehiclePlates.0.plate.letters' },
    // { header: 'Wheel Drive', key: 'wheelDrive.abbreviation' },
    // { header: 'Engine Type', key: 'engineStructure.engineType' },
    // { header: 'Cylinders', key: 'numberOfCylinders' },
    // { header: 'Engine Charger', key: 'engineCharger.engineChargerName' },
    // { header: 'Fuel Type', key: 'engineFuel.engineFuelType' },
    // { header: 'Transmission', key: 'transmission.name' },
    // { header: 'Gears', key: 'transmissionGears' },
    // { header: 'VIN', key: 'vin' }
    ];
    form!: FormGroup;
    vehicles? : CustomerVehicleWithDetailsDTO[]
    selectedVehicle: CustomerVehicleWithDetailsDTO | null = null;
    isFormOpen = false;

    constructor( private formBuilder: FormBuilder,
                private customerService : CustomerService,
                private router : Router,
                private recevier: SendformCustomerSearchToCustomerCarsService,
                private helloPermission : PermissionService,
                private carService : CarService,
                private sender : SendFromCustomerVehicleToVehicleMaintenanceService,
                private fb: FormBuilder , 
                private maintenanceServ : MaintenanceService
    ){}

    ngOnInit(): void {
        this.comingData = this.recevier.getData();
        this.form = this.fb.group({
            km: ['', Validators.required]
        })
        //per
        this.viewCustomerCars = this.helloPermission.hasPermission('CustomerVehicleContro','GetAllCustomerVehicles') 
        this.viewAddCar = this.helloPermission.hasPermission('CustomerVehicleContro','AddNewVehicleToCustomer')
        this.viewActionColumn = this.helloPermission.hasPermission('CustomerVehicleContro','update') || this.helloPermission.hasPermission('CustomerVehicleContro','delete');
        this.viewDeleteButton = this.helloPermission.hasPermission('CustomerVehicleContro','delete');
        this.viewUpdateButton = this.helloPermission.hasPermission('CustomerVehicleContro','update');
        if(this.viewCustomerCars) this.fetchCustomerVehicles();
        //
        this.customerFirstName = this.comingData?.firstName || "";
        this.customerLastName = this.comingData?.lastName || "";


    }   

    deleteVehicle($event: any) {
        throw new Error('Method not implemented.');
    }

    updateVehicle($event: any) {
        throw new Error('Method not implemented.');
    }
    
    fetchCustomerVehicles(): void {
        this.customerService.getCustomerVehicles(Number(this.comingData?.id)).subscribe(
            (response: CustomerVehicleWithDetailsDTO[]) => {
                this.vehicles =  response
            },
        (error) => {
            console.error('Error fetching vehicles:', error);
        }
        );
    }

    handleRowSelection(selectedRow: any) {
        this.selectedVehicle = selectedRow;
        this.sender.setData(this.selectedVehicle)
    }

    openFormToAddCar(){
        if(this.viewAddCar){
            this.isFormOpen = true;
        }
    }

    changeCar(){
        this.selectedVehicle = null
    }
    
    backToSearchCustomer(){
        this.router.navigateByUrl('/add-new-maintenance'); 
    }

    handleCarAdded(newCar: AddNewVehicleToCustomerDTO) {
            var car = new AddNewVehicleToCustomerDTO();
            car = newCar;

            if (car.customerVehicle) {
                car.customerVehicle.customerId = this.comingData?.id;
            }
            console.log('Sending DTO:', car);

            this.carService.addNewVehicleToSpecificCusomer(newCar).subscribe(
                (response: CustomerVehicleDTO) => {
                    this.fetchCustomerVehicles();
                },
                (error) => {
                    console.error('Error adding vehicle:', error);
                }
            );    
            }

    addNewMaintenanceForCurrentVehicle() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
        }
        else {
            this.maintenanceServ.addNewMaintenance(this.selectedVehicle?.id, this.form.value.km)
            .subscribe(
            (response) => {
                console.log("form service",response)
                this.sender.setData_1(response);
                this.router.navigate(['/MaintenanceCard']);
            },
            (error) => {
                console.error('Error adding maintenance', error);
            }
            );
        }
    }
}

