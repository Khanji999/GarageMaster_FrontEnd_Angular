import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GenericFormComponent } from "../../components/generic-form/generic-form.component";
import { CustomerDTO, CustomerVehicleWithDetailsDTO, EmployeeContro, EmployeeDTO, EmployeeMaintainedDTO, MaintenaceCardContro, MaintenaceCardDTO, MaintenaceServiceDTO, MaintenanceCardWithFullDetailsDTO, MaintenanceServiceNoteDTO, ServiceContro, ServiceTableWithServiceTypeDTO, ServiceTypeContro, ServiceTypeDTO } from '../../../core/services/callAPI/api.service';
import { CommonModule } from '@angular/common';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GenericTableComponent } from "../../components/generic-table/generic-table.component";
import { ToastrModule, ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-fifth-add-services',
  imports: [GenericFormComponent, CommonModule, ReactiveFormsModule ,FormsModule],
  templateUrl: './fifth-add-services.component.html',
  styleUrl: './fifth-add-services.component.scss'
})
export class FifthAddServicesComponent implements OnInit{
employeeDropdownOpen: boolean[] = [];
@Input() maintenanceCard!: MaintenanceCardWithFullDetailsDTO;
@Output() close = new EventEmitter<void>();
@Output() stepBack = new EventEmitter<void>();
@Output() m = new EventEmitter<MaintenanceCardWithFullDetailsDTO>();

title?: string;
form!: FormGroup;

servicetypes: ServiceTypeDTO[] | undefined;
services: ServiceTableWithServiceTypeDTO[] = [];
costs: number[] = [];
Employees: EmployeeDTO[] = [];

selectedServices: ServiceTableWithServiceTypeDTO[] = [];
selectedEmployees: EmployeeDTO[][] = [];
serviceNotes: MaintenanceServiceNoteDTO[][] = [];

private employeesLoaded = false;
private serviceTypesLoaded = false;

constructor(
  private fb: FormBuilder,
  private serviceTypeContro: ServiceTypeContro,
  private serviceContro: ServiceContro,
  private maintenanceContro: MaintenaceCardContro,
  private toastr: ToastrService,
  private employeeContro: EmployeeContro
) {}

ngOnInit(): void {
  this.title = "Maintenance Card Number : " + this.maintenanceCard?.maintenanceNumberForEachTenant;

  this.form = this.fb.group({
    serviceType: [null, Validators.required],
    service: [null, Validators.required],
    employee: [null, Validators.required],
  });

  this.getServiceType();
  this.getEmployees();

  this.form.get('serviceType')?.valueChanges.subscribe((serviceTypeId: number) => {
    if (serviceTypeId) {
      this.services = [];
      this.getServicesByTypeId(serviceTypeId);
      this.form.patchValue({ service: null });
    } else {
      this.services = [];
    }
  });
}

getServiceType() {
  this.serviceTypeContro.getAll().subscribe((response) => {
    this.servicetypes = response.result;
    this.serviceTypesLoaded = true;
    this.tryLoadExisting();
  });
}

getEmployees() {
  this.employeeContro.getAll().subscribe((response) => {
    this.Employees = response.result!;
    this.employeesLoaded = true;
    this.tryLoadExisting();
  });
}

tryLoadExisting() {
  if (this.serviceTypesLoaded && this.employeesLoaded) {
    this.loadAllServices().then(() => {
      this.loadExistingMaintenanceServices();
    });
  }
}

async loadAllServices() {
  const promises = (this.servicetypes ?? []).map(type =>
    this.serviceContro.getServicesByServieTypeId(type.id).toPromise()
  );

  const results = await Promise.all(promises);
  this.services = results.flatMap(res => res?.result ?? []);
}

getServicesByTypeId(id: number) {
  this.serviceContro.getServicesByServieTypeId(id).subscribe((response) => {
    if (response.result) {
      this.services = response.result;
    }
  });
}

toggleEmployeeDropdown(serviceIndex: number): void {
  this.employeeDropdownOpen[serviceIndex] = !this.employeeDropdownOpen[serviceIndex];
}

toggleEmployeeCheckbox(emp: any, serviceIndex: number): void {
  if (!this.selectedEmployees[serviceIndex]) {
    this.selectedEmployees[serviceIndex] = [];
  }

  const alreadyAdded = this.selectedEmployees[serviceIndex].some(e => e.id === emp.id);
  if (alreadyAdded) {
    this.selectedEmployees[serviceIndex] = this.selectedEmployees[serviceIndex].filter(e => e.id !== emp.id);
  } else {
    this.selectedEmployees[serviceIndex] = [...this.selectedEmployees[serviceIndex], emp];
  }

  this.updateMaintenanceCardServices();
}

onServiceSelect(event: Event): void {
  const selectedObject = this.form.get('service')?.value;
  this.form.patchValue({ service: null });

  const alreadySelected = this.selectedServices.some(s => s.id === selectedObject.id);
  if (!alreadySelected) {
    this.selectedServices.push(selectedObject);
    this.costs.push(0);
    this.selectedEmployees.push([]);
    this.employeeDropdownOpen.push(false);
    this.serviceNotes.push([]);
    this.updateMaintenanceCardServices();
  } else {
    this.toastr.error('This Service Has Already Been Added');
  }
}

removeService(index: number): void {
  this.selectedServices.splice(index, 1);
  this.costs.splice(index, 1);
  this.selectedEmployees.splice(index, 1);
  this.employeeDropdownOpen.splice(index, 1);
  this.serviceNotes.splice(index, 1);
  this.updateMaintenanceCardServices();
}

isEmployeeSelected(emp: any, serviceIndex: number): boolean {
  return this.selectedEmployees[serviceIndex]?.some(e => e.id === emp.id) ?? false;
}

removeEmployee(serviceIndex: number, employeeIndex: number): void {
  this.selectedEmployees[serviceIndex].splice(employeeIndex, 1);
  this.updateMaintenanceCardServices();
}

private updateMaintenanceCardServices(): void {
  if (!this.maintenanceCard) return;

  this.maintenanceCard.maintenaceServices = this.selectedServices.map((service, i) => {
    const dto = new MaintenaceServiceDTO();
    dto.serviceId = service.id!;
    dto.cost = this.costs[i];

    dto.employeeMaintaineds = (this.selectedEmployees[i] || []).map(emp => {
      const empDto = new EmployeeMaintainedDTO();
      empDto.employeeId = emp.id;
      return empDto;
    });

    dto.maintenanceServiceNotes = this.serviceNotes[i] || [];
    return dto;
  });
}

addNote(serviceIndex: number): void {
  if (!this.serviceNotes[serviceIndex]) {
    this.serviceNotes[serviceIndex] = [];
  }

  const noteDto = new MaintenanceServiceNoteDTO();
  noteDto.text = '';
  noteDto.fualtCode = '';
  noteDto.howToFixIt = '';
  this.serviceNotes[serviceIndex].push(noteDto);

  this.updateMaintenanceCardServices();
}

removeNote(serviceIndex: number, noteIndex: number): void {
  this.serviceNotes[serviceIndex].splice(noteIndex, 1);
  this.updateMaintenanceCardServices();
}

sendData() {
  if (!this.maintenanceCard) {
    this.toastr.error("Error");
    return;
  }

  this.maintenanceContro.addingNewMaintenance(this.maintenanceCard).subscribe(
    (response) => {
      console.log(response.result);
      this.toastr.success("Card Added");
      this.closeMenu();
    },
    (error) => {
      console.error(error);
      this.toastr.error("Failed to add card");
    }
  );
}

loadExistingMaintenanceServices(): void {
  if (!this.maintenanceCard || !this.maintenanceCard.maintenaceServices) return;

  this.maintenanceCard.maintenaceServices.forEach(mService => {
    const serviceObj = this.services.find(s => s.id === mService.serviceId);
    if (!serviceObj) return;

    this.selectedServices.push(serviceObj);
    this.costs.push(mService.cost ?? 0);

    const assignedEmployees = (mService.employeeMaintaineds || [])
      .map(emp => this.Employees.find(e => e.id === emp.employeeId))
      .filter((e): e is EmployeeDTO => !!e);
    this.selectedEmployees.push(assignedEmployees);

    this.employeeDropdownOpen.push(false);
    this.serviceNotes.push(mService.maintenanceServiceNotes || []);
  });
}

closeMenu() {
  this.close.emit();
  console.log(this.maintenanceCard);
}

back() {
  this.closeMenu();
  this.m.emit(this.maintenanceCard);
  this.stepBack.emit();
}

}
