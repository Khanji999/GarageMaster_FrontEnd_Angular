import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomerDTO, CustomerVehicleWithDetailsDTO } from '../../../core/services/callAPI/api.service';
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
    customerFirstName = "";
    customerLastName = "";
    columns = [
    { header: 'Brand', key: 'vehicleModel.vehicleBrand.name' },
    { header: 'Model', key: 'vehicleModel.name' },
    { header: 'Year', key: 'yearModel' },
    { header: 'Engine Cylinders', key: 'numberOfCylinders' },
    { header: 'Engine Type', key: 'engineStructure.engineType' },
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
                private route: ActivatedRoute,
                private router : Router,
                private recevier: SendformCustomerSearchToCustomerCarsService
                
    ){}
    ngOnInit(): void {
        // this.customerID 
        // this.customerFirstName = this.route.snapshot.paramMap.get('CustmerName') || '';
        // this.customerLastName = this.route.snapshot.paramMap.get('CustomerLastName') || '';
        // this.fetchCustomerVehicles();
        this.recevier.currentData.subscribe(data => {
            this.comingData = data;
        });
        this.fetchCustomerVehicles();
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
}

