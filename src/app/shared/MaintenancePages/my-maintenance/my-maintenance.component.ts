import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MaintenaceCardContro, MaintenanceCardWithFullDetailsDTO } from '../../../core/services/callAPI/api.service';
import { CommonModule } from '@angular/common';
import { MaintenanceFormComponent } from '../../forms/maintenance-form/maintenance-form.component';
import { UpdateMaintenanceFormComponent } from '../../forms/update-maintenance-form/update-maintenance-form.component';
import { UpdateServicesInMaintenanceComponent } from "../../forms/update-services-in-maintenance/update-services-in-maintenance.component";

@Component({
  selector: 'app-my-maintenance',
  imports: [ReactiveFormsModule, CommonModule, MaintenanceFormComponent, UpdateServicesInMaintenanceComponent],
  templateUrl: './my-maintenance.component.html',
  styleUrl: './my-maintenance.component.scss'
})
export class MyMaintenanceComponent implements OnInit{
  
  form!: FormGroup;
  maintenances: MaintenanceCardWithFullDetailsDTO[] = []
  columns = [
    { header: 'Card Number', key: 'maintenanceNumberForEachTenant' },
    { header: 'Customer Full Name', key: 'fullName' },
    { header: 'Customer Vehicle', key: 'vehicleDetails' },
  ]
  showViewMaintenancePopup = false;
  showUpdateMaintenancePopup = false;
  selectedMaintenance?: MaintenanceCardWithFullDetailsDTO;

  constructor(private fb: FormBuilder,
    private maintenanceContr: MaintenaceCardContro,
    private router: Router
  ){}

  getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  }
    
  ngOnInit(): void {
    this.form = this.fb.group({
      empFirstName: [''],
      empLastName: [''],
      empFatherName: [''],
      custFirstName: [''],
      custFatherName: [''],
      custLastName: [''],
      servName: [''],
      vehBrand: [''],
      vehModel: [''],
    })
    this.getMyMaint();
  }

  openMainteancePopup(row : any){
  this.selectedMaintenance = undefined;
  this.showViewMaintenancePopup = true
  this.selectedMaintenance = row;
  }
  openMainteancePopupforUpdate(row : any){
  this.selectedMaintenance = undefined;
  this.showUpdateMaintenancePopup = true
  this.selectedMaintenance = row;
  }
  // Services filtered form backend to get only fits with my employee Id ,
  getMyMaint(){
    this.maintenanceContr.getMaintenanceByEmpId().subscribe(
      (response) => {
      this.maintenances = response.result!.map((main: any) => {
          const status = main.isCompleted
            ? 'completed'
            : main.isPending
            ? 'pending'
            : main.isCanceled
            ? 'canceled'
            : 'unknown';
        
          return {
            ...main,
            fullName: `${main.customerVehicle.customer.firstName} ${main.customerVehicle.customer.lastName}`,
            vehicleDetails: `${main.customerVehicle.vehicleModel.vehicleBrand.name} ${main.customerVehicle.vehicleModel.name} ${main.customerVehicle.yearModel}`,
            status ,
            maintanedBy : `${main.customerVehicle.customer.firstName} ${main.customerVehicle.customer.lastName}`
          };
      }
      )
    })
  }
}
