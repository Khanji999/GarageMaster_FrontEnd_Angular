import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GenericFormComponent } from "../../components/generic-form/generic-form.component";
import { MaintenaceCardContro, MaintenaceServiceDTO, MaintenanceCardWithFullDetailsDTO } from '../../../core/services/callAPI/api.service';
import { FormGroup, FormBuilder, ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-maintenance-form',
  imports: [GenericFormComponent,CommonModule , ReactiveFormsModule],
  templateUrl: './maintenance-form.component.html',
  styleUrl: './maintenance-form.component.scss',
  providers: [DatePipe],
})
export class MaintenanceFormComponent implements OnInit{
  @Input() maintenance!: MaintenanceCardWithFullDetailsDTO;
  @Output() closeForm = new EventEmitter<void>(); 

  closeFormAndDestroy() {
    this.closeForm.emit(); 
  }
  form!: FormGroup;

  constructor(private fb: FormBuilder,
          private datePipe: DatePipe,
          private maintenanceContro : MaintenaceCardContro
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      maintenanceNumber: [''] ,
      dateIn:[''] ,
      dateOut: [''] ,
      kilometers: [''] ,
      comments: [''] ,
      status: [''] ,
      customerFirstName: [''] ,
      customerFatherName: [''] ,
      customerLastName: [''] ,
      vin:[''] ,
      model:[''] ,
      brand:[''] ,
      yearModel:[''] ,
      cylinders: [''] ,
      plate: [''] ,
      color:[''] ,
      services:[''] ,
      employees: [''] ,
      isReadyToBeDelivered: [''],
    });
    this.form.patchValue({
      maintenanceNumber:this.maintenance.maintenanceNumberForEachTenant,
      dateIn: this.datePipe.transform(this.maintenance.dateIn , 'dd-MMM-yyyy hh:mm a'),
      dateOut:this.datePipe.transform(this.maintenance.dateOut,),
      kilometers:this.maintenance.kilometers,
      comments:this.maintenance.comments,
      status:this.getStatus(this.maintenance),
      isReadyToBeDelivered: this.maintenance.isReadyToBeDelivered,
      customerFirstName: this.maintenance.customerVehicle?.customer?.firstName,
      customerFatherName: this.maintenance.customerVehicle?.customer?.fatherName,
      customerLastName: this.maintenance.customerVehicle?.customer?.lastName,
      vin:this.maintenance.customerVehicle?.vin,
      yearModel:this.maintenance.customerVehicle?.yearModel,
      brand:this.maintenance.customerVehicle?.vehicleModel?.vehicleBrand?.name,
      model:this.maintenance.customerVehicle?.vehicleModel?.name,
      cylinders:this.maintenance.customerVehicle?.yearModel,
      plate:`${this.maintenance.customerVehicle?.customerVehiclePlates?.[0].plate?.numbers} - ${this.maintenance.customerVehicle?.customerVehiclePlates?.[0].plate?.letters}`,
      color:this.maintenance.customerVehicle?.customerVehicleColors?.[0].color?.name,
      services:this.maintenance.maintenaceServices
    });
  }
  getStatus(m: MaintenanceCardWithFullDetailsDTO): string {
    if (m.isCanceled) return 'Canceled';
    if (m.isCompleted) return 'Completed';
    if (m.isPending) return 'Pending';
    return 'Unknown';
  }

  get totalCost(): number {
    return this.maintenance.maintenaceServices
      ?.reduce((sum, service) => sum + (service.cost || 0), 0) || 0;
  }
  
  generatePDF() {
    console.log(this.maintenance)
    this.maintenanceContro.generatePdf(this.maintenance).subscribe(
      (response) => {
        const blob = new Blob([response.data], { type: 'application/pdf' });
      
        // Create a URL for the Blob
        const url = URL.createObjectURL(blob);
        
        // Open the PDF in a new tab
        window.open(url);
      }
    )
  }
}
