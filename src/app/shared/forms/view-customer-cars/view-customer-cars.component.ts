import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomerDTO, CustomerVehicleDTO, CustomerVehicleWithDetailsDTO } from '../../../core/services/callAPI/api.service';
import { CommonModule } from '@angular/common';
import { GenericTableComponent } from "../../components/generic-table/generic-table.component";
import { AddCarFormComponent } from "../add-car-form/add-car-form.component";
import { CustomerService } from '../../../core/services/customerService/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SendformCustomerSearchToCustomerCarsService } from '../../../core/services/sendformCustomerSearchToCustomerCars/sendform-customer-search-to-customer-cars.service';

@Component({
    selector: 'app-view-customer-cars',
    imports: [CommonModule, AddCarFormComponent, GenericTableComponent],
    templateUrl: './view-customer-cars.component.html',
    styleUrl: './view-customer-cars.component.scss'
})
export class ViewCustomerCarsComponent  implements OnInit{
    comingData? : CustomerDTO ;
    customerID!: number;
    customerFirstName?: string;
    customerLastName?: string ;
    columns = [
    { header: 'Brand', key: 'vehicleModel.vehicleBrand.name' },
    { header: 'Model', key: 'vehicleModel.name' },
    { header: 'Wheel Drive', key: 'wheelDrive.abbreviation' },
    { header: 'Year', key: 'yearModel' },
    { header: 'Cylinders', key: 'numberOfCylinders' },
    { header: 'Engine Type', key: 'engineStructure.engineType' },
    { header: 'Engine Charger', key: 'engineCharger.engineChargerName' },
    { header: 'Fuel Type', key: 'engineFuel.engineFuelType' },
    { header: 'Color', key: 'customerVehicleColors.0.color.name' },
    { header: 'Plate', key: 'customerVehiclePlates.0.plate.number' }
    ];
    form!: FormGroup;
    vehicles? : CustomerVehicleWithDetailsDTO[]
    selectedVehicle: CustomerVehicleWithDetailsDTO | null = null;
    isFormOpen = false;

    constructor( private formBuilder: FormBuilder,
                private customerService : CustomerService,
                private router : Router,
                private recevier: SendformCustomerSearchToCustomerCarsService
                
    ){}

    ngOnInit(): void {
        this.comingData = this.recevier.getData();

        this.fetchCustomerVehicles();

        this.customerFirstName = this.comingData?.firstName || "";
        this.customerLastName = this.comingData?.lastName || "";

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
    }

    openFormToAddCar(){
        this.isFormOpen = true;
    }


    changeCar(){
        this.selectedVehicle = null
    }
    
    backToSearchCustomer(){
        this.router.navigateByUrl('/dashboard'); 
    }

    handleCarAdded(newCar: CustomerVehicleDTO) {
        newCar.customerId = this.comingData?.id;
        console.log(newCar)
        console.log("newCar")
        this.customerService.addNewVehicleToSpecificCusomer(newCar).subscribe(
            (response: CustomerVehicleDTO) => {
                console.log("ok")
                this.fetchCustomerVehicles();
            },
        (error) => {
            console.error('Error fetching vehicles:', error);
        }
        );
    }

}

