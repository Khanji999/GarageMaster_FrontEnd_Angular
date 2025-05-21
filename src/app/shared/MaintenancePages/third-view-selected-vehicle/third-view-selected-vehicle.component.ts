import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CustomerVehicleWithDetailsDTO, MaintenaceCardContro, MaintenaceCardDTO, MaintenaceServiceContro, MaintenanceCardWithFullDetailsDTO } from '../../../core/services/callAPI/api.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GenericFormComponent } from "../../components/generic-form/generic-form.component";
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-third-view-selected-vehicle',
  imports: [CommonModule, ReactiveFormsModule, GenericFormComponent],
  templateUrl: './third-view-selected-vehicle.component.html',
  styleUrl: './third-view-selected-vehicle.component.scss'
})
export class ThirdViewSelectedVehicleComponent implements OnInit{
  addingMaintenance?: MaintenanceCardWithFullDetailsDTO;
  @Input() selectedVehicle: CustomerVehicleWithDetailsDTO | undefined ;
  @Output() close = new EventEmitter<void>() ; 
  @Output() stepBack = new EventEmitter<void>() ; 
  @Output() maintenanceDTO = new EventEmitter<MaintenanceCardWithFullDetailsDTO>();
  form! :FormGroup 

constructor(
            private fb: FormBuilder , 
            private maintContro: MaintenaceCardContro,
){}
  ngOnInit(): void {
    this.addingMaintenance = new MaintenanceCardWithFullDetailsDTO();
    this.form = this.fb.group({
      km: ['', Validators.required]
    })  
    this.form.get('numberOkmfGear')?.valueChanges.subscribe(val => {
      this.addingMaintenance!.kilometers = val;
    });
    this.addingMaintenance!.customerVehicleId =this.selectedVehicle?.id;

    this.maintContro.getLastMaintenanceCard().subscribe(
        (response) => {
          if(response){
            this.addingMaintenance!.maintenanceNumberForEachTenant = response.result!.maintenanceNumberForEachTenant! + 1
          }
          else{
            this.addingMaintenance!.maintenanceNumberForEachTenant = 1
          }
          }
        );
  }

  closeMenu(){
    this.close.emit(); 
  }

  back(){
    this.closeMenu();
    this.stepBack.emit(); 
  }

  addNewMaint(){
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    }
    else{
        this.maintenanceDTO.emit(this.addingMaintenance); 
        this.closeMenu()
        }
    }
} 

