import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GenericFormComponent } from "../../components/generic-form/generic-form.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeContro, EmployeeDTO, MaintenaceCardContro, MaintenaceServiceDTO, MaintenanceCardWithFullDetailsDTO, MaintenanceServiceNoteDTO } from '../../../core/services/callAPI/api.service';
import { CommonModule, DatePipe } from '@angular/common';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-update-services-in-maintenance',
  imports: [GenericFormComponent, ReactiveFormsModule , CommonModule , FormsModule],
  templateUrl: './update-services-in-maintenance.component.html',
  styleUrl: './update-services-in-maintenance.component.scss',
  providers: [DatePipe],
})
export class UpdateServicesInMaintenanceComponent implements OnInit{
  @Input() maintenance!: MaintenanceCardWithFullDetailsDTO;
  @Output() closeForm = new EventEmitter<void>(); 

  currentUserId!: number;
  form!: FormGroup;
  
  constructor(private fb: FormBuilder,
          private datePipe: DatePipe,
          private maintenanceContro : MaintenaceCardContro,
          private jwtHelper: JwtHelperService,
          private employeeContro: EmployeeContro
  ) {}

  ngOnInit(): void {
    this.maintenance = structuredClone(this.maintenance);
    const token = localStorage.getItem('token'); // or your auth service
      if (token) {
        const decodedToken = this.jwtHelper.decodeToken(token);
        this.currentUserId = decodedToken?.sub; // adjust based on your token structure
      }
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

    if(this.maintenance.maintenaceServices){
        setTimeout(() => this.preloadEmployeesFromNotes(), 0); 
    }
  }

employeeMap = new Map<number, EmployeeDTO>();
loadingEmployeeIds = new Set<number>();

getEmployeeName(userId: number): string | null {
  const emp = this.employeeMap.get(userId);
  return emp ? `${emp.firstName} ${emp.lastName}` : null;
}
  preloadEmployeesFromNotes(): void {
  const allNotes = this.maintenance!.maintenaceServices!.flatMap(s => s.maintenanceServiceNotes || []);
  const uniqueUserIds = Array.from(new Set(allNotes.map(n => n.createdBy).filter(id => id)));

  for (const userId of uniqueUserIds) {
    this.fetchEmployee(userId!);
  }
}
fetchEmployee(userId: number): void {
  // If we already have the employee, don't fetch again
  if (this.employeeMap.has(userId) || this.loadingEmployeeIds.has(userId)) {
    return;
  }

  this.loadingEmployeeIds.add(userId); // prevent duplicate parallel calls

  this.employeeContro.getEmpByUserId(userId).subscribe({
    next: (res) => {
      const emp = res.result;
      if (emp) {
        this.employeeMap.set(userId, emp);
      }
      this.loadingEmployeeIds.delete(userId);
    },
    error: (err) => {
      console.error("Failed to load employee:", err);
      this.loadingEmployeeIds.delete(userId);
    }
  });
}

  closeFormAndDestroy() {
    this.closeForm.emit(); 
  }
  getStatus(m: MaintenanceCardWithFullDetailsDTO): string {
    if (m.isCanceled) return 'Canceled';
    if (m.isCompleted) return 'Completed';
    if (m.isPending) return 'Pending';
    return 'Unknown';
  }

  setStatusForService(serviceItem: MaintenaceServiceDTO, status: 'completed' | 'pending' | 'canceled') {
    serviceItem.isCompleted = status === 'completed';
    serviceItem.isPending = status === 'pending';
    serviceItem.isCanceled = status === 'canceled';
  }
  addNoteToService2(service: any): void {
    if (!Array.isArray(service.maintenanceServiceNotes)) {
      service.maintenanceServiceNotes = [];
    }
  
    service.maintenanceServiceNotes.push(new MaintenanceServiceNoteDTO());
  }
  removeNewNote(service: any, noteIndex: number) {
    service.maintenanceServiceNotes.splice(noteIndex, 1);
  }
   saveUpdatedMaintenance() {
    this.maintenanceContro.updateMaintenance(this.maintenance).subscribe(
      (response) => {
        if (response.statusCode === 200) {
          this.closeFormAndDestroy();
        }
      }
    );
  }

}
