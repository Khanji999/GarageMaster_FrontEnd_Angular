import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Observable, of, debounceTime, switchMap, distinctUntilChanged } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CustomerDTO } from '../../../../core/services/callAPI/api.service';
import { CustomerService } from '../../../../core/services/customerService/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SendformCustomerSearchToCustomerCarsService } from '../../../../core/services/sendformCustomerSearchToCustomerCars/sendform-customer-search-to-customer-cars.service';
import { CountryISO, NgxIntlTelInputModule, SearchCountryField } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-adding-maintenance',
  imports: [CommonModule, ReactiveFormsModule, NgxIntlTelInputModule ],
  templateUrl: './adding-maintenance.component.html',
  styleUrl: './adding-maintenance.component.scss'
})
export class AddingMaintenanceComponent implements OnInit {

  form!: FormGroup;
  customers$: Observable<CustomerDTO[]> = of([]);
  selectedCustomer: CustomerDTO | null = null;
  clue = ""
  isDisabled: boolean = false; 
  constructor(
    private formBuilder: FormBuilder,
    public customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute,
    private sender: SendformCustomerSearchToCustomerCarsService
  ) {}


  ngOnInit(): void {
    this.route?.data.subscribe(data => {
      this.clue = data['myTitle'];
    });
    this.form = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      phoneNumber: [''],
    });

    this.customers$ = this.form.valueChanges.pipe(
      debounceTime(340), 
      distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)), 
      switchMap(({ firstName, lastName }) => {
        if (firstName?.length > 2 && lastName?.length > 2) {
          return this.customerService.getCustomerByFirstAndLastName(firstName, lastName);
        }

        if (!firstName && lastName?.length > 2) {
          return this.customerService.getCustomerByLastName(lastName);
        }
        if (firstName?.length > 2 && !lastName) {
          return this.customerService.getCustomerByFirstName(firstName);
        }
        else{
          return of([]); 
        }
      })
    );
  }

  removeSearch(){
    this.selectedCustomer = null
    this.form.reset(); 
  }  

  handleCustomerClick(customer: CustomerDTO){
    this.selectedCustomer = customer; 
    this.sender.setData(customer);
    this.router.navigate(['/customerVehicles']);
  }        
}