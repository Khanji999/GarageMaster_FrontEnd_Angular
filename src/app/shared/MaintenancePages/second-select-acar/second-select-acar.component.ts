import { Component, EventEmitter, Input, input, OnInit, Output, output } from '@angular/core';
import { AddNewVehicleToCustomerDTO, CustomerDTO, CustomerVehicleContro, CustomerVehicleDTO, CustomerVehicleWithDetailsDTO } from '../../../core/services/callAPI/api.service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PermissionService } from '../../../core/services/permissionService/permission.service';
import { GenericTableComponent } from "../../components/generic-table/generic-table.component";
import { AddCarFormComponent } from "../../forms/add-car-form/add-car-form.component";
import { CommonModule } from '@angular/common';
import { GenericFormComponent } from "../../components/generic-form/generic-form.component";
import { map } from 'rxjs';
import { DeleteDialogComponent } from "../../components/delete-dialog/delete-dialog.component";
import { ToastrService } from 'ngx-toastr';
import { compose } from '@ngrx/store';

@Component({
  selector: 'app-second-select-acar',
  imports: [CommonModule, GenericTableComponent, AddCarFormComponent, ReactiveFormsModule, GenericFormComponent, DeleteDialogComponent],
  templateUrl: './second-select-acar.component.html',
  styleUrl: './second-select-acar.component.scss'
})
export class SecondSelectACarComponent  implements OnInit{
  @Input() selectedCustomer :CustomerDTO | undefined;
  @Output() close = new EventEmitter<void>() ; 
  @Output() selectedVehicle = new EventEmitter<CustomerVehicleWithDetailsDTO>() ; 
  showDeleteDialog = false;

//  Permissions
  viewCustomerCars = false
  viewAddCar = false;
  viewActionColumn = false;
  viewUpdateButton = false;
  viewDeleteButton = false;
//
  form!: FormGroup;
  vehicles? : CustomerVehicleWithDetailsDTO[]
  selectedVehi: CustomerVehicleWithDetailsDTO | null = null;
  isAddCarFormOpen = false;

  columns = [
    { header: 'Brand', key: 'vehicleModel.vehicleBrand.name' },
    { header: 'Model', key: 'vehicleModel.name' },
    { header: 'Year', key: 'yearModel' },
    { header: 'Color', key: 'customerVehicleColors.0.color.name' },
    { header: 'Plate-Number', key: 'customerVehiclePlates.0.plate.numbers' },
    { header: 'Plate-Letters', key: 'customerVehiclePlates.0.plate.letters' },
    ];

  constructor(
              private customerVehicleContro : CustomerVehicleContro,
              private helloPermission : PermissionService,
              private toastr: ToastrService
  ){}
  
  ngOnInit(): void {
    //per
    this.viewCustomerCars = this.helloPermission.hasPermission('CustomerVehicleContro','GetAllCustomerVehicles') 
    this.viewAddCar = this.helloPermission.hasPermission('CustomerVehicleContro','AddNewVehicleToCustomer')
    this.viewActionColumn = this.helloPermission.hasPermission('CustomerVehicleContro','Update') || this.helloPermission.hasPermission('CustomerVehicleContro','DeleteById');
    this.viewDeleteButton = this.helloPermission.hasPermission('CustomerVehicleContro','DeleteById');
    this.viewUpdateButton = this.helloPermission.hasPermission('CustomerVehicleContro','Update');
    if(this.viewCustomerCars) this.fetchCustomerVehicles();
  }

  fetchCustomerVehicles(): void {
    if(this.selectedCustomer?.id){
      this.customerVehicleContro.getAllCustomerVehicles(this.selectedCustomer?.id).subscribe(
      (response) => {
        this.vehicles =  response.result
      }
    );
    } 
  }

  deleteId = 0;
  deleteVehicle($event: CustomerVehicleDTO) {
    this.showDeleteDialog = true
    if($event.id)
      this.deleteId = $event.id ;
  }
  
  onCancel() {
    this.showDeleteDialog = false
  }
  onConfirm() {
    this.showDeleteDialog = false
    this.customerVehicleContro.deleteById(this.deleteId).subscribe(
      (response) => {
        if (response.success) {
          this.fetchCustomerVehicles();
          this.toastr.success('Vehicle deleted successfully');
        } else {
          this.toastr.warning('Could not delete the vehicle');
        }
      },
      (error) => {
        this.toastr.error("Cannot Delete This Car. It has a relation with other data");
      }
    );
  }

  selectedRowForUpdate: CustomerVehicleWithDetailsDTO | undefined
  isUpdateFormOpen = false;
  updateVehicle($event: CustomerVehicleWithDetailsDTO) {
    this.selectedRowForUpdate = $event;
    this.isUpdateFormOpen = true
  }


  openFormToAddCar(){
    if(this.viewAddCar){
        this.isAddCarFormOpen = true;
    }
  }
  handleCarAdded(newCar: AddNewVehicleToCustomerDTO) {
    var car = new AddNewVehicleToCustomerDTO();
    car = newCar;
    if (car.customerVehicle) {
        car.customerVehicle.customerId =this.selectedCustomer?.id;
        this.customerVehicleContro.addNewVehicleToCustomer(newCar).subscribe(
          (response: CustomerVehicleDTO) => {
            this.toastr.success('Vehicle Added successfully');
            this.fetchCustomerVehicles();
          },
          (error) => {
            this.toastr.error('Error adding vehicle:');
          }
      );    
    }
  }

  handleRowSelection(selectedRow: CustomerVehicleWithDetailsDTO) {
    this.selectedVehi = selectedRow;
    this.selectedVehicle.emit(selectedRow); 
    this.close.emit(); 
  }

  changeCar(){
    this.selectedVehi = null
}

  closeMenu(){
    this.selectedCustomer= undefined;
    this.close.emit(); 
}

}
