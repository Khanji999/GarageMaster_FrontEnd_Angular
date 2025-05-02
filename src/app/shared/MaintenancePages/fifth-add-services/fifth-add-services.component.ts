import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GenericFormComponent } from "../../components/generic-form/generic-form.component";
import { CustomerDTO, CustomerVehicleWithDetailsDTO, EmployeeContro, EmployeeDTO, EmployeeMaintainedDTO, MaintenaceCardContro, MaintenaceCardDTO, MaintenaceServiceDTO, NewMaintenanceCardDTO, ServiceContro, ServiceTableWithServiceTypeDTO, ServiceTypeContro, ServiceTypeDTO } from '../../../core/services/callAPI/api.service';
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

  @Input() maintenanceCard!: MaintenaceCardDTO ;
  @Output() close = new EventEmitter<void>() ; 
  @Output() stepBack = new EventEmitter<void>() ;
  title?: String;
  form!:FormGroup;
  servicetypes : ServiceTypeDTO[] | undefined
  services : ServiceTableWithServiceTypeDTO[] = []
  selectedServices : ServiceTableWithServiceTypeDTO[] = []
  addingMaintenance?: NewMaintenanceCardDTO
  costs: number[] = [];
  Employees: EmployeeDTO[] = [];
  selectedEmployees: EmployeeDTO[][] = [];
  
  constructor( private fb: FormBuilder , private serviceTypeContro : ServiceTypeContro,
              private serviceContro : ServiceContro,
              private maintenanceContro : MaintenaceCardContro,
              private toastr : ToastrService,
              private employeeContro: EmployeeContro
  ){}

  ngOnInit(): void {
    this.setTitle();
    this.form = this.fb.group({
          serviceType: ['', Validators.required],
          service: ['', Validators.required],
          employee: ['', Validators.required],
    })
    this.getServiceType();
    this.getEmployees();
    this.form.get('serviceType')?.valueChanges.subscribe((serviceTypeId: number) => {
      if (serviceTypeId) {
        this.services = []
        this.getServicesByTypeId(serviceTypeId)
        this.form.patchValue({
          service: ""
          }); 
      } else {
        this.services = [];
      }
    })
  }

  getServiceType(){
    this.serviceTypeContro.getAll().subscribe(
      (response) => {
        this.servicetypes =  response.result 
      }
    )
  }
  getServicesByTypeId(id : number) {
    this.serviceContro.getServicesByServieTypeId(id).subscribe(
      (response) =>{
        if(response.result)
        this.services = response.result
      }
    )
  }
  setTitle(){
    this.title = "Maintenance Card Number : " + this.maintenanceCard?.maintenanceNumberForEachTenant;
  }
  onServiceSelect(event: Event) {
    const selectedObject = this.form.get('service')?.value;
    this.form.patchValue({
      service: ""
      }); 
    const alreadySelected = this.selectedServices.some(s => s.id === selectedObject.id);
    if (!alreadySelected) {
      // this.selectedServices.push(selectedObject);
      this.selectedServices.push(selectedObject); // Add to the beginning
      this.costs.push(0); 
    }
    else{
      this.toastr.error("This Service Has Already Added");
    }
  }
  getEmployees(){
    this.employeeContro.getAll().subscribe(
      (response) => {
        this.Employees = response.result!;
      }
    )
  }
  onEmployeeSelect(event: any, serviceIndex: number) {
    const selectedEmpId = +event.target.value; 
    const selectedEmp = this.Employees.find(emp => emp.id === selectedEmpId); 
  
    if (!selectedEmp) return; 
  
    if (!this.selectedEmployees[serviceIndex]) {
      this.selectedEmployees[serviceIndex] = [];
    }
  
    const alreadySelected = this.selectedEmployees[serviceIndex].some(emp => emp.id === selectedEmpId);
    if (!alreadySelected) {
      this.selectedEmployees[serviceIndex].push(selectedEmp);
    } else {
      this.toastr.error("Employee already added for this service");
    }
  }
//   this.selectedServices.splice(index, 1); for remove 
// this.costs.splice(index, 1);
  sendData() {
    if (!this.addingMaintenance) {
      this.addingMaintenance = new NewMaintenanceCardDTO(); 
    }

    if (this.maintenanceCard) {
      this.addingMaintenance.customerVehicleId = this.maintenanceCard.customerVehicleId;
      this.addingMaintenance.kilometers = this.maintenanceCard.kilometers;
      this.addingMaintenance.maintenanceNumberForEachTenant = this.maintenanceCard.maintenanceNumberForEachTenant;

      this.addingMaintenance.maintenaceServices = this.selectedServices.map((service, i) => {
        const dto = new MaintenaceServiceDTO();
        dto.serviceId = service.id!;
        dto.cost = this.costs[i];
        const selectedEmps = this.selectedEmployees[i] || []; 
        dto.employeeMaintaineds = selectedEmps.map(emp => {
          const empMaintained = new EmployeeMaintainedDTO();
          empMaintained.employeeId = emp.id;
          return empMaintained;
        });

        return dto;
      });

      console.log(this.addingMaintenance);
      this.maintenanceContro.addingNewMaintenance(this.addingMaintenance).subscribe(
        (response) => {
          console.log(response.result);
          this.toastr.success("Card Added");
          this.closeMenu();
        }
      );
    } else {
      console.error("Maintenance card is not initialized.");
      this.toastr.error("Error");

    }
  }
  closeMenu(){
    this.close.emit(); 
  }
  back(){
    this.closeMenu();
    this.stepBack.emit(); 
  }


}
