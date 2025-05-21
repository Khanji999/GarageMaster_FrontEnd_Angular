import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EmployeeContro, EmployeeDTO, EmployeeMaintainedDTO, MaintenaceCardContro, MaintenaceServiceDTO, MaintenanceCardWithFullDetailsDTO, MaintenanceDescriptionDTO, MaintenanceServiceNoteDTO, ServiceContro, ServiceTableDTO, ServiceTypeContro, ServiceTypeDTO } from '../../../core/services/callAPI/api.service';
import { GenericFormComponent } from "../../components/generic-form/generic-form.component";
import { CommonModule, DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';

@Component({
  selector: 'app-update-maintenance-form',
  imports: [GenericFormComponent, ReactiveFormsModule, CommonModule , FormsModule],
  templateUrl: './update-maintenance-form.component.html',
  styleUrl: './update-maintenance-form.component.scss',
  providers: [DatePipe],
})
export class UpdateMaintenanceFormComponent implements OnInit{
  // form last step : Take Maintenance Cards with values inserted form all last steps
  @Input() maintenance!: MaintenanceCardWithFullDetailsDTO;
  // cloastForm used to clost the form whether form close button or close icon form form 
  @Output() closeForm = new EventEmitter<void>(); 
  // used to till the parent to make a refresh after the update is success
  @Output() refresh = new EventEmitter<void>(); 
  form!: FormGroup;
  // this is the maintenanceStatus
  currentStatus?: string;
  // labels
  statuses = ['Completed', 'Pending', 'Canceled']; 
  //List of servicesTypes are used in dropdown to get all services based on this value
  serviceTypes : ServiceTypeDTO[]= [];
  //values for emp dropdown
  employees : EmployeeDTO[] = [];

  currentUserId!: number;

  constructor(private fb: FormBuilder,
          private jwtHelper: JwtHelperService,
          private datePipe: DatePipe,
          private maintenanceContro : MaintenaceCardContro,
          private employeeContro : EmployeeContro,
          private toastr: ToastrService,
          private serviceContro : ServiceContro,
          private serviceTypeContr: ServiceTypeContro
  ) {}

  ngOnInit(): void {
    this.maintenance = structuredClone(this.maintenance);

    const token = localStorage.getItem('token'); // or your auth service
  if (token) {
    const decodedToken = this.jwtHelper.decodeToken(token);
    this.currentUserId = decodedToken?.sub; // adjust based on your token structure
    console.log(this.currentUserId)
  }
    // from is used only for display basic information 
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

    //async change form html for  isReadyToBeDelivered
    this.form.get('isReadyToBeDelivered')?.valueChanges.subscribe(val => {
      if (val === true) {
        // Check if all services [array] are either completed or canceled
        const allServicesDone = this.maintenance.maintenaceServices!.every(
          service => service.isCompleted || service.isCanceled
        );
        // only if it is false ; false means there is one service status = pending
        if (!allServicesDone) {
          this.toastr.warning('Cannot deliver this car before all services are completed or canceled.');
          this.form.get('isReadyToBeDelivered')?.setValue(false, { emitEvent: false }); // used to return the value to false
          return;
        }
      }
      // Update the status flags
      this.maintenance.isReadyToBeDelivered = val; // need to update value of maintenance to allow me to change the stauts of card it self
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
        if(this.maintenance.maintenaceServices){
        setTimeout(() => this.preloadEmployeesFromNotes(), 0); 
    }
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
  // when open tihs update form : get status of maintenance
  // i need this fucntion becuase the maintenance card has three fields 
  getStatus(m: MaintenanceCardWithFullDetailsDTO): string {
    if (m.isCanceled) return 'Canceled';
    if (m.isCompleted) return 'Completed';
    if (m.isPending) return 'Pending';
    return 'Unknown';
  }
  // this is to check the status of card 
  // on click run setstauts and get class => currentStatus
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

  setStatusForService(serviceItem: MaintenaceServiceDTO, status: 'completed' | 'pending' | 'canceled') {
    serviceItem.isCompleted = status === 'completed';
    serviceItem.isPending = status === 'pending';
    serviceItem.isCanceled = status === 'canceled';
    if (status === 'pending') {  
      this.maintenance.isReadyToBeDelivered = false;
      this.form.get('isReadyToBeDelivered')?.setValue(false, { emitEvent: false });
      this.setStatus("Pending");
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
  newService.maintenaceCardId = this.maintenance.id;

  newService.service = new ServiceTableDTO();
  newService.isPending = true;
  newService.isCompleted = false;
  newService.isCanceled = false;
  newService.employeeMaintaineds = [];
  (newService as any).tempId = Date.now() + Math.random();

  this.maintenance.isReadyToBeDelivered = false;
  this.maintenance.isCompleted = false;
  this.maintenance.isPending = true;
  this.maintenance.isCanceled = false;
  this.setStatus('Pending');
  this.form.get('isReadyToBeDelivered')?.setValue(false, { emitEvent: false });
  this.toastr.warning('Delivery status turned off because one service is added.');

  this.maintenance.maintenaceServices!.push(newService);
  }
  closeFormAndDestroy() {
    this.closeForm.emit(); 
  }
  employeeDropdownOpen: { [serviceId: number]: boolean } = {};

// Toggle dropdown open/close per service
toggleEmployeeDropdown(service: MaintenaceServiceDTO) {
  const key = service.id ?? (service as any).tempId;
  this.employeeDropdownOpen[key] = !this.employeeDropdownOpen[key];
}

  isDropdownOpen(service: MaintenaceServiceDTO): boolean {
    const key = service.id ?? (service as any).tempId;
    return !!this.employeeDropdownOpen[key];
  }
  removeDescription(index: number) {
    this.maintenance.maintenanceDescriptions!.splice(index, 1);
  }
removeNewService(index: number) {
  this.maintenance.maintenaceServices!.splice(index, 1);
}
// Check if employee is already selected
isEmployeeAlreadySelected(serviceItem: any, emp: EmployeeDTO): boolean {
  return serviceItem.employeeMaintaineds?.some((e: any) => e.employee?.id === emp.id);
}
addNoteToService(serviceItem: any) {
  const note = serviceItem.newNote;
  if (note?.text || note?.fualtCode || note?.howToFixIt) {
    if (!serviceItem.maintenanceServiceNotes) {
      serviceItem.maintenanceServiceNotes = [];
    }
    serviceItem.maintenanceServiceNotes.push({ ...note });
    serviceItem.newNote = {}; // Reset fields
  }
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


// Add or remove employee on checkbox change
  toggleEmployeeForService(serviceItem: MaintenaceServiceDTO, emp: EmployeeDTO) {
    serviceItem.employeeMaintaineds = serviceItem.employeeMaintaineds || [];

    const index = serviceItem.employeeMaintaineds.findIndex(
      (e: any) => e.employee?.id === emp.id
    );

    if (index !== -1) {
      serviceItem.employeeMaintaineds.splice(index, 1); // Remove
    } else {
      const newEmp = new EmployeeMaintainedDTO();
      newEmp.employeeId = emp.id!;
      newEmp.employee = emp;
      newEmp.maintenaceServiceId = serviceItem.id; // Optional if service is not saved yet
      serviceItem.employeeMaintaineds.push(newEmp); // Add
    }
  }
  addDescription() {
    this.maintenance.maintenanceDescriptions = this.maintenance.maintenanceDescriptions || [];

    const newDesc = new MaintenanceDescriptionDTO();
    newDesc.text = '';

    this.maintenance.maintenanceDescriptions.push(newDesc);
  }
employeeMap = new Map<number, EmployeeDTO>();
loadingEmployeeIds = new Set<number>();

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
}
