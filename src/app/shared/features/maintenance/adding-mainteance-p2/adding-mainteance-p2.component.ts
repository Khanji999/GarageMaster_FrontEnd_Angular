import { Component, OnInit } from '@angular/core';
import { SendformCustomerSearchToCustomerCarsService } from '../../../../core/services/sendformCustomerSearchToCustomerCars/sendform-customer-search-to-customer-cars.service';
import { CustomerContactNumberContro, CustomerContactNumberDTO, CustomerContro, CustomerDTO, CustomerVehicleWithDetailsDTO, MaintenaceCardDTO } from '../../../../core/services/callAPI/api.service';
import { SendFromCustomerVehicleToVehicleMaintenanceService } from '../../../../core/services/sendFromCustomerVehicleToVehicleMainteance/send-from-customer-vehicle-to-vehicle-maintenance.service';
import { CustomerService } from '../../../../core/services/customerService/customer.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-adding-mainteance-p2',
  imports: [CommonModule],
  templateUrl: './adding-mainteance-p2.component.html',
  styleUrl: './adding-mainteance-p2.component.scss'
})
export class AddingMainteanceP2Component implements OnInit {
  customerID : any 
  customerCar? : CustomerVehicleWithDetailsDTO ;
  customerPhoneNumber? : CustomerContactNumberDTO;
  maintenanceCard? : MaintenaceCardDTO
  constructor(private CustomerCarReceiver : SendFromCustomerVehicleToVehicleMaintenanceService,
              private customerService : CustomerService
  ){}

  ngOnInit(): void {
    this.customerCar = this.CustomerCarReceiver.getData();
    this.maintenanceCard = this.CustomerCarReceiver.getData_1();
    this.customerID = this.customerCar?.customer?.id 
    this.getCustomerPhoneNumber(this.customerID);
  }
  getCustomerPhoneNumber(customerid : number): void {
    this.customerService.getCustomerPhoneNumber(customerid).subscribe(
      (response) => {
        this.customerPhoneNumber = response;
      },
      (error) => {
        console.error('Error fetching models:', error);
      }
    );
  }
}
