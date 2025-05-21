import { Component, EventEmitter, Input, input, OnInit, Output } from '@angular/core';
import { CustomerContactNumberContro, CustomerContactNumberDTO, CustomerContro, CustomerDTO, CustomerVehicleWithDetailsDTO, MaintenaceCardContro, MaintenaceCardDTO, MaintenanceCardWithFullDetailsDTO, MaintenanceDescriptionDTO } from '../../../core/services/callAPI/api.service';
import { GenericFormComponent } from "../../components/generic-form/generic-form.component";
import { map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fourth-view-maintenance',
  imports: [GenericFormComponent , ReactiveFormsModule , CommonModule],
  templateUrl: './fourth-view-maintenance.component.html',
  styleUrl: './fourth-view-maintenance.component.scss'
})
export class FourthViewMaintenanceComponent implements OnInit {

  @Input() selectedCustomer :CustomerDTO | undefined;
  @Input() selectedVehicle: CustomerVehicleWithDetailsDTO | undefined ;
  @Input() maintenanceCard: MaintenanceCardWithFullDetailsDTO | undefined ;
  @Output() close = new EventEmitter<void>() ; 
  @Output() stepBack = new EventEmitter<void>() ; 
  @Output() moveToService = new EventEmitter<void>() ; 
  
  customerPhoneNumber? : CustomerContactNumberDTO;
  form!: FormGroup;

  constructor(              
    private customerContro : CustomerContactNumberContro,
    private maintContro: MaintenaceCardContro,
    private toaster: ToastrService,
    private fb : FormBuilder,
  ){}

  ngOnInit(): void {
    console.log(this.maintenanceCard)
    if(this.selectedCustomer?.id){ 
      this.getCustomerPhoneNumber(this.selectedCustomer?.id);
    }
    this.form = this.fb.group({
        notes: this.fb.array([]) 
      });
   this.initNotesFromExistingDescriptions();

  }

  initNotesFromExistingDescriptions() {
  const existingDescriptions = this.maintenanceCard?.maintenanceDescriptions || [];

  // Avoid duplicating notes if already initialized
  if (this.notes.length === 0 && existingDescriptions.length > 0) {
    existingDescriptions.forEach(desc => {
      this.notes.push(this.fb.control(desc.text, Validators.required));
    });
  }
}
  get notes(): FormArray {
    return this.form.get('notes') as FormArray;
  }

  addNote(): void {
  this.notes.push(this.fb.control('', Validators.required));
  }

  removeNote(index: number): void {
    this.notes.removeAt(index);
  }

  clearNotes(): void {
    this.notes.clear();
  }

  getCustomerPhoneNumber(customerid : number): void {
    this.customerContro.getCustomerPhoneNumber(customerid).subscribe(
      (response) => {
        this.customerPhoneNumber = response.result;
      }
    );
  }
  hasDescriptions()  {
    return this.maintenanceCard!.maintenanceDescriptions &&
          this.maintenanceCard!.maintenanceDescriptions.length > 0;
  }
  createMaintenanceWithoutServices(){
    if (this.form.invalid || this.notes.length === 0) {
    this.form.markAllAsTouched(); // show errors
    return;
  }
  const notes: string[] = this.form.value.notes;

  this.maintenanceCard!.maintenanceDescriptions = notes.map(note => {
    const desc = new MaintenanceDescriptionDTO();
    desc.text = note;
    return desc;
  });
      this.maintContro.addingNewMaintenance(this.maintenanceCard).subscribe(
      (response) => {
        console.log(response.result);
        this.toaster.success("Card Added");
        this.closeMenu();
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
  if (this.form.invalid || this.notes.length === 0) {
    this.form.markAllAsTouched(); 
    return;
  }
    const notes: string[] = this.form.value.notes;

  this.maintenanceCard!.maintenanceDescriptions = notes.map(note => {
    const desc = new MaintenanceDescriptionDTO();
    desc.text = note;
    return desc;
  });
    this.moveToService.emit();
  }
}
