import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MaintenanceCardWithFullDetailsDTO, MaintenaceCardContro, MaintenanceFilter } from '../../../core/services/callAPI/api.service';
import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MaintenanceFormComponent } from "../../forms/maintenance-form/maintenance-form.component";
import { UpdateMaintenanceFormComponent } from "../../forms/update-maintenance-form/update-maintenance-form.component";

@Component({
  selector: 'app-get-all-maintenances',
  imports: [ReactiveFormsModule, CommonModule, MaintenanceFormComponent, UpdateMaintenanceFormComponent],
  templateUrl: './get-all-maintenances.component.html',
  styleUrl: './get-all-maintenances.component.scss', animations: [
    trigger('expandCollapse', [
      state('collapsed', style({
        height: '0',
        opacity: 0,
        overflow: 'hidden',
        paddingTop: '0',
        paddingBottom: '0',
        marginTop: '0',
        marginBottom: '0'
      })),
      state('expanded', style({
        height: '*',
        opacity: 1,
        overflow: 'visible',
        paddingTop: '*',
        paddingBottom: '*',
        marginTop: '*',
        marginBottom: '*'
      })),
      transition('collapsed <=> expanded', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class GetAllMaintenancesComponent implements OnInit{
  form!: FormGroup;
  maintenances: MaintenanceCardWithFullDetailsDTO[] = []
  columns = [
    { header: 'Card Number', key: 'maintenanceNumberForEachTenant' },
    { header: 'Customer Full Name', key: 'fullName' },
    { header: 'Customer Vehicle', key: 'vehicleDetails' },
  ]

  showViewMaintenancePopup = false;
  selectedMaintenance?: MaintenanceCardWithFullDetailsDTO;

  showUpdateMaintenancePopup = false;


  constructor(private fb: FormBuilder,
    private maintenanceContr: MaintenaceCardContro,
    private router: Router
    ){}
    showAllFilters = false;

    toggleFilters() {
      this.showAllFilters = !this.showAllFilters;
    }
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
  }
  addMaintenance() {
    this.router.navigate(['/add-new-maintenance']);
  }
  submit(){
    this.maintenances = [];
    this.showAllFilters = false;
    const cardFilter = new MaintenanceFilter();
    cardFilter.employeeFirstName = this.form.value.empFirstName;
    cardFilter.employeeFatherName = this.form.value.empFatherName
    cardFilter.employeeLastName = this.form.value.empLastName
    cardFilter.customerFirstName = this.form.value.custFirstName
    cardFilter.serviceName = this.form.value.servName
    cardFilter.vehicleBrandName = this.form.value.vehBrand
    cardFilter.vehicleModelName = this.form.value.vehModel
    this.maintenanceContr.getAllMaintenanceWithDetails(cardFilter).subscribe(
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
  }) }
  openMainteancePopup(row : any){
    this.showViewMaintenancePopup = true
    this.selectedMaintenance = row;
    }
  
  openUpdateMainteancePopup(row : any){
    this.showUpdateMaintenancePopup = true
    this.selectedMaintenance = row;
    }

}