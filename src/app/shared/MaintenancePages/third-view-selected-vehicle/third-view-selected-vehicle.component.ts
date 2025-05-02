import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CustomerVehicleWithDetailsDTO, MaintenaceCardContro, MaintenaceCardDTO, MaintenaceServiceContro } from '../../../core/services/callAPI/api.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GenericFormComponent } from "../../components/generic-form/generic-form.component";

@Component({
  selector: 'app-third-view-selected-vehicle',
  imports: [CommonModule, ReactiveFormsModule, GenericFormComponent],
  templateUrl: './third-view-selected-vehicle.component.html',
  styleUrl: './third-view-selected-vehicle.component.scss'
})
export class ThirdViewSelectedVehicleComponent implements OnInit{

  @Input() selectedVehicle: CustomerVehicleWithDetailsDTO | undefined ;
  @Output() close = new EventEmitter<void>() ; 
  @Output() stepBack = new EventEmitter<void>() ; 
  @Output() maintenanceDTO = new EventEmitter<MaintenaceCardDTO>();
  form! :FormGroup 

constructor(
            private fb: FormBuilder , 
            private maintContro: MaintenaceCardContro

){}
  ngOnInit(): void {
    this.form = this.fb.group({
      km: ['', Validators.required]
    })  
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
      const mCard= new MaintenaceCardDTO();
      mCard.customerVehicleId =this.selectedVehicle?.id;
      mCard.kilometers = this.form.value.km;
      this.maintContro.getLastMaintenanceCard().subscribe(
        (response) => {
          if( response.result?.maintenanceNumberForEachTenant)
            mCard.maintenanceNumberForEachTenant = response.result?.maintenanceNumberForEachTenant + 1;
          this.maintenanceDTO.emit(mCard); 
          this.closeMenu()
        }
      )
    }
  } 

}
