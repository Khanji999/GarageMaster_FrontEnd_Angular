import { Component, OnInit } from '@angular/core';
import { GenericTableComponent } from "../../components/generic-table/generic-table.component";
import { CustomerVehicleContro, CustomerVehicleWithDetailsDTO } from '../../../core/services/callAPI/api.service';
import { AddCustomerWithCarComponent } from "../../forms/add-customer-with-car/add-customer-with-car.component";

@Component({
  selector: 'app-view-all-vehicle',
  imports: [GenericTableComponent, AddCustomerWithCarComponent],
  templateUrl: './view-all-vehicle.component.html',
  styleUrl: './view-all-vehicle.component.scss'
})
export class ViewAllVehicleComponent implements OnInit {

  carAddForm = false;
  customerVehicles : CustomerVehicleWithDetailsDTO[] = []
  selectedVeh?: CustomerVehicleWithDetailsDTO;
  columns = [
    { header: 'Customer Name', key: 'processedData' },
    { header: 'Brand', key: 'vehicleModel.vehicleBrand.name' },
    { header: 'Model', key: 'vehicleModel.name' },
    { header: 'Year', key: 'yearModel' },
    { header: 'Color', key: 'customerVehicleColors.0.color.name' },
    { header: 'Plate-Number', key: 'customerVehiclePlates.0.plate.numbers' },
    { header: 'Plate-Letters', key: 'customerVehiclePlates.0.plate.letters' },
    ];
  constructor(private customerVehicleContr : CustomerVehicleContro ){}

  ngOnInit(): void {
    this.getVehicles();
  }
  openAddCarForm() {
    this.carAddForm = true;
  }
  updateVehicle($event: CustomerVehicleWithDetailsDTO) {
    this.selectedVeh = $event;
    this.carAddForm = true;
  }
  getVehicles(){
    this.customerVehicleContr.getAllVehicles().subscribe(
      (response) => {
        this.customerVehicles = response.result!.map((data: any) => ({
        ...data, 
        processedData: `${data.customer.firstName} ${data.customer.fatherName} ${data.customer.lastName}`
      }));
      }
    )
  }
}
