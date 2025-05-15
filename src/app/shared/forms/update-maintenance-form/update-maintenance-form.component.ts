import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EmployeeContro, EmployeeDTO, EmployeeMaintainedDTO, MaintenaceCardContro, MaintenaceServiceDTO, MaintenanceCardWithFullDetailsDTO, ServiceContro, ServiceTableDTO, ServiceTypeContro, ServiceTypeDTO } from '../../../core/services/callAPI/api.service';
import { GenericFormComponent } from "../../components/generic-form/generic-form.component";
import { CommonModule, DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-maintenance-form',
  imports: [GenericFormComponent, ReactiveFormsModule, CommonModule , FormsModule],
  templateUrl: './update-maintenance-form.component.html',
  styleUrl: './update-maintenance-form.component.scss',
  providers: [DatePipe],
})
export class UpdateMaintenanceFormComponent implements OnInit{
  @Input() maintenance!: MaintenanceCardWithFullDetailsDTO;
  @Output() closeForm = new EventEmitter<void>(); 
  @Output() refresh = new EventEmitter<void>(); 
  form!: FormGroup;
  currentStatus?: string;
  statuses = ['Completed', 'Pending', 'Canceled']; // labels

  serviceTypes : ServiceTypeDTO[]= [];
  employees : EmployeeDTO[] = [];

  constructor(private fb: FormBuilder,
          private datePipe: DatePipe,
          private maintenanceContro : MaintenaceCardContro,
          private employeeContro : EmployeeContro,
          private toastr: ToastrService,
          private serviceContro : ServiceContro,
          private serviceTypeContr: ServiceTypeContro
  ) {}

  ngOnInit(): void {
    this.maintenance = structuredClone(this.maintenance);
    
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
      services: this.fb.array([]),
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
      plate:`${this.maintenance.customerVehicle?.customerVehiclePlates?.[0].plate?.numbers} - ${this.maintenance.customerVehicle?.customerVehiclePlates?.[0].plate?.letters}`,
      color:this.maintenance.customerVehicle?.customerVehicleColors?.[0].color?.name,
    });
    this.currentStatus = this.getStatus(this.maintenance);
    this.form.get('isReadyToBeDelivered')?.valueChanges.subscribe(val => {
      if (val === true) {
        // Check if all services are either completed or canceled
        const allServicesDone = this.maintenance.maintenaceServices!.every(
          service => service.isCompleted || service.isCanceled
        );
        if (!allServicesDone) {
          this.toastr.warning('Cannot deliver this car before all services are completed or canceled.');
          this.form.get('isReadyToBeDelivered')?.setValue(false, { emitEvent: false });
          return;
        }
      }
      // Update the status flags
      this.maintenance.isReadyToBeDelivered = val;
      if (val === false) {
        this.currentStatus = 'Pending';
        this.maintenance.isCompleted = false;
        this.maintenance.isPending = true;
        this.maintenance.isCanceled = false;
      }
    });
    
    // load types of services only one time  no need to laod it more then 1 time 
    this.getServiceTypes();
    this.loadDropdown();
    this.getEmployee();
    
  } 
  // when open upload popup load current stauts 
  getStatus(m: MaintenanceCardWithFullDetailsDTO): string {
    if (m.isCanceled) return 'Canceled';
    if (m.isCompleted) return 'Completed';
    if (m.isPending) return 'Pending';
    return 'Unknown';
  }
  // on click run setstauts and getstatusClass
  setStatus(newStatus: string) {  
    // Reset all flags
    this.maintenance.isCanceled = false;
    this.maintenance.isCompleted = false;
    this.maintenance.isPending = false;
  
    // Set selected flag
    if (newStatus === 'Canceled') {
      this.currentStatus ='Canceled'
      this.maintenance.isCanceled = true;
    }
    else if (newStatus === 'Completed') {
      if (this.maintenance.isReadyToBeDelivered) {
        this.currentStatus ='Completed'
        this.maintenance.isCompleted = true;
      } else {
        this.currentStatus ='Pending' 
        this.toastr.warning('The maintenance is not ready to be delivered.', 'Warning');
      }
    }    
    else if (newStatus === 'Pending') {
      this.maintenance.isPending = true;
      this.currentStatus ='Pending';
    }   
  }
  getStatusClasses(status: string): string {
    if (status === this.currentStatus) {
      switch (status) {
        case 'Completed': return 'bg-green-500 ';
        case 'Pending': return 'bg-orange-400 ';
        case 'Canceled': return 'bg-red-500 ';
      }
    }
    return 'bg-white text-gray-600 hover:bg-gray-100';
  }
  // call this component when loading the page to fill out the dropdown ( frist time )
  loadDropdown(){
    // for each service objcet . i will get service items 
    this.maintenance.maintenaceServices?.forEach(serviceItem => {
      const typeId = serviceItem.service?.serviceTypeId;
      // load drop down service .
      if (typeId) {
        this.serviceContro.getServicesByServieTypeId(typeId).subscribe(res => {
          serviceItem.availableServices = res.result;
          } ); 
      }
      else {
        serviceItem.availableServices = [];
      }
    });
  }

  setStatusForService(serviceItem: MaintenaceServiceDTO, status: 'completed' | 'pending' | 'canceled') {
    serviceItem.isCompleted = status === 'completed';
    serviceItem.isPending = status === 'pending';
    serviceItem.isCanceled = status === 'canceled';
    if (status === 'pending') {  
      this.maintenance.isReadyToBeDelivered = false;
      this.form.get('isReadyToBeDelivered')?.setValue(false, { emitEvent: false });
  
      // Optional: show a toaster to inform user
      this.toastr.warning('Delivery status turned off because one service is pending.');
    }
  }
    // call This function every time user change servieType 
    // item is the selected item form the list 
  onServiceTypeChange(serviceItem: MaintenaceServiceDTO, event: Event) {
    const selectElement = event.target as HTMLSelectElement;  // get selected item form serviceType menu when the user click on it 
    const selectedTypeId = Number(selectElement.value); // convert it to 
  
    // clear selected Id and list of services that depend on maintenance Type
    serviceItem.serviceId = undefined; 
    serviceItem.availableServices = undefined;
  
    // insert new type to the servicetype ( forg key in new object)
    serviceItem.service!.serviceTypeId = selectedTypeId;
  
    // Load available services depend on serviceType
    if (selectedTypeId) {
      this.serviceContro.getServicesByServieTypeId(selectedTypeId).subscribe(res => {
        serviceItem.availableServices = res.result;
      });
    }
  }
  getServiceTypes(){
    this.serviceTypeContr.getAll().subscribe(
      (response) => {
        this.serviceTypes = response.result!
      }
    )
  }

  getEmployee(){
    this.employeeContro.getAllEmployeesWithDetails().subscribe(
      (response) => {
        this.employees = response.result!
      }
    )
  }

  saveUpdatedMaintenance() {
    this.maintenanceContro.updateMaintenance(this.maintenance).subscribe(
      (response) => {
        if (response.statusCode === 200) {
            this.refresh.emit(); 
          this.closeFormAndDestroy();
        }
      }
    );
  }

  removeEmployeeFromService(serviceItem: MaintenaceServiceDTO, employeeId: any) {
    serviceItem.employeeMaintaineds = serviceItem.employeeMaintaineds?.filter(em => em.employee!.id !== employeeId);
  }
  onEmployeeSelect(event: Event, serviceItem: MaintenaceServiceDTO) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedEmployeeId = Number(selectElement.value);
  
    if (!selectedEmployeeId) return;
  
    const employeeToAdd = this.employees.find(emp => emp.id === selectedEmployeeId);
    if (!employeeToAdd) return;
  
    serviceItem.employeeMaintaineds = serviceItem.employeeMaintaineds || [];
  
    const alreadyExists = serviceItem.employeeMaintaineds.some(
      e => e.employeeId === selectedEmployeeId
    );
    
    if (!alreadyExists) {
      const newEmployeeEntry = new EmployeeMaintainedDTO();
      newEmployeeEntry.employeeId = employeeToAdd.id!;
      newEmployeeEntry.employee = employeeToAdd;
      newEmployeeEntry.maintenaceServiceId = serviceItem.id;
      serviceItem.employeeMaintaineds.push(newEmployeeEntry);
  
      this.toastr.success(`${employeeToAdd.firstName} added successfully`, 'Employee Added');
    } else {
      this.toastr.warning(`${employeeToAdd.firstName} is already assigned to this service`, 'Duplicate Entry');
    }
  }
  addNewService() {
    const newService = new MaintenaceServiceDTO();
    newService.maintenaceCardId = this.maintenance.id
    // Optional: set any default service type or values
    newService.service = new ServiceTableDTO();
    newService.isPending = true;
    newService.isCompleted = false;
    newService.isCanceled = false;
    this.maintenance.isReadyToBeDelivered = false;
    this.maintenance.isCompleted = false;
    this.maintenance.isPending = true;
    this.maintenance.isCanceled = false;
    this.form.get('isReadyToBeDelivered')?.setValue(false, { emitEvent: false });
    this.toastr.warning('Delivery status turned off because one service is added.');
    // Push the new service to the array
    this.maintenance.maintenaceServices!.push(newService);
  }
  
  closeFormAndDestroy() {
    this.closeForm.emit(); 
  }
}
