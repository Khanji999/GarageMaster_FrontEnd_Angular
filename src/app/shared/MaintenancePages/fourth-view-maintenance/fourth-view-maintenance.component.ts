import { Component, EventEmitter, Input, input, OnInit, Output } from '@angular/core';
import { CustomerContactNumberContro, CustomerContactNumberDTO, CustomerContro, CustomerDTO, CustomerVehicleWithDetailsDTO, MaintenaceCardDTO } from '../../../core/services/callAPI/api.service';
import { GenericFormComponent } from "../../components/generic-form/generic-form.component";
import { map } from 'rxjs';

@Component({
  selector: 'app-fourth-view-maintenance',
  imports: [GenericFormComponent],
  templateUrl: './fourth-view-maintenance.component.html',
  styleUrl: './fourth-view-maintenance.component.scss'
})
export class FourthViewMaintenanceComponent implements OnInit {

  @Input() selectedCustomer :CustomerDTO | undefined;
  @Input() selectedVehicle: CustomerVehicleWithDetailsDTO | undefined ;
  @Input() maintenanceCard: MaintenaceCardDTO | undefined ;

  @Output() close = new EventEmitter<void>() ; 
  @Output() stepBack = new EventEmitter<void>() ; 
  @Output() moveToService = new EventEmitter<void>() ; 
  
  customerPhoneNumber? : CustomerContactNumberDTO;
  
  constructor(              
    private customerContro : CustomerContactNumberContro
  ){}

  ngOnInit(): void {
    if(this.selectedCustomer?.id){ 
      this.getCustomerPhoneNumber(this.selectedCustomer?.id);
    }
  }

  getCustomerPhoneNumber(customerid : number): void {
    this.customerContro.getCustomerPhoneNumber(customerid).subscribe(
      (response) => {
        this.customerPhoneNumber = response.result;
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
  openServiceForm() {
    this.moveToService.emit();
  }
}
