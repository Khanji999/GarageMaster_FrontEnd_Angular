import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GenericTableComponent } from "../../components/generic-table/generic-table.component";
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MaintenaceCardContro, MaintenanceCardWithFullDetailsDTO, MaintenanceFilter } from '../../../core/services/callAPI/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [ReactiveFormsModule, GenericTableComponent , CommonModule ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit{
  form!: FormGroup;
  maintenances: MaintenanceCardWithFullDetailsDTO[] = []
  columns = [
    { header: 'Brand', key: 'id' }]
    showOverlay = false;



  constructor(private fb: FormBuilder,
    private maintenanceContr: MaintenaceCardContro
    ){}

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

  submit(){
    const cardFilter = new MaintenanceFilter();
    cardFilter.employeeFirstName = this.form.value.empFirstName;
    cardFilter.employeeFatherName = this.form.value.empFatherName
    cardFilter.employeeLastName = this.form.value.empLastName
    cardFilter.customerFirstName = this.form.value.empFatherName
    cardFilter.serviceName = this.form.value.servName
    cardFilter.vehicleBrandName = this.form.value.vehBrand
    cardFilter.vehicleModelName = this.form.value.vehModel
    this.maintenanceContr.getAllMaintenanceWithDetails(cardFilter).subscribe(
      (response) => {
        console.log(response.result);
        this.maintenances = response.result!
      }
    )

    
  }
}