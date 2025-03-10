import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Observable, of, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { CustomerDTO, CustomerVehicleDTO } from '../../../core/services/callAPI/api.service';
import { CustomerService } from '../../../core/services/customerService/customer.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-maintenance',
  imports: [CommonModule , ReactiveFormsModule],
  templateUrl: './add-maintenance.component.html',
  styleUrl: './add-maintenance.component.scss'
})
export class AddMaintenanceComponent implements OnInit {
  form!: FormGroup;
  customers$: Observable<CustomerDTO[]> = of([]);
  selectedCustomer: CustomerDTO | null = null;
  vehicles$: Observable<CustomerVehicleDTO[]> = of([]);
  flagCar: boolean = false;
  isProgrammaticUpdate: boolean = false; // Flag to track programmatic updates

  constructor(
    private formBuilder: FormBuilder,
    public customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      userName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['',],
      customerVehicle: ['', Validators.required],
    });

    // Call backend to search for customers
    this.customers$ = this.form.controls['userName'].valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((name) => {
        // Skip if the update is programmatic
        if (this.isProgrammaticUpdate) {
          this.isProgrammaticUpdate = false; // Reset the flag
          return of([]);
        }

        // Reset vehicles and flagCar when the search input changes
        this.vehicles$ = of([]);
        this.flagCar = false;

        if (name.length > 2) {
          return this.customerService.getCustomerBySeaching(name);
        } else {
          return of([]);
        }
      })
    );
  }

  onSelectCustomer(customer: CustomerDTO): void {
    this.selectedCustomer = customer;

    // Set the flag to indicate a programmatic update
    this.isProgrammaticUpdate = true;

    // Update the input value with the selected customer's name
    this.form.controls['userName'].setValue(`${customer.firstName} ${customer.lastName}`);

    // Fetch vehicles for the selected customer
    this.fetchCustomerVehicles();
  }

  fetchCustomerVehicles(): void {
    if (this.selectedCustomer?.id) {
      this.customerService.getCustomerVehicles(this.selectedCustomer.id).subscribe(
        (vehicles: CustomerVehicleDTO[]) => {
          this.vehicles$ = of(vehicles);
          this.flagCar = true;
        },
        (error) => {
          console.error('Error fetching vehicles:', error);
        }
      );
    }
  }
}