import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Observable, of, debounceTime, switchMap, distinctUntilChanged, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CustomerDTO } from '../../../../core/services/callAPI/api.service';
import { CustomerService } from '../../../../core/services/customerService/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SendformCustomerSearchToCustomerCarsService } from '../../../../core/services/sendformCustomerSearchToCustomerCars/sendform-customer-search-to-customer-cars.service';
import { CountryISO, NgxIntlTelInputModule, SearchCountryField } from 'ngx-intl-tel-input';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-adding-maintenance',
  imports: [CommonModule, ReactiveFormsModule, NgxIntlTelInputModule],
  templateUrl: './adding-maintenance.component.html',
  styleUrl: './adding-maintenance.component.scss',
  animations: [
    trigger('cardAnimation', [
      state('void', style({ opacity: 0, transform: 'translateY(20px)' })),
      transition(':enter', [
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('heightAnimation', [
      state('void', style({ height: '0' })),
      transition(':enter', [
        animate('350ms ease-out', style({ height: '*' }))
      ])
    ])
  ]
})

export class AddingMaintenanceComponent implements OnInit {

  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.Lebanon, CountryISO.SaudiArabia ,CountryISO.UnitedArabEmirates, CountryISO.Qatar ];
  
  form!: FormGroup;
  customers$: Observable<CustomerDTO[]> = of([]);
  selectedCustomer: CustomerDTO | null = null;
  searchText = true
  noResult = false; 

  constructor(
    private formBuilder: FormBuilder,
    public customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute,
    private sender: SendformCustomerSearchToCustomerCarsService
  ) {}


  ngOnInit(): void {
      this.form = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      phoneNumber: [''],
    });

     this.customers$ = this.form.valueChanges.pipe(
      debounceTime(340),
      distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)),
      switchMap(({ firstName, lastName }) => {
        this.noResult = false; 
        
        if (firstName?.length > 2 && lastName?.length > 2) {
          this.searchText = false;
          return this.customerService.getCustomerByFirstAndLastName(firstName, lastName).pipe(
            map(result => {
              if (!result || result.length === 0) {
                this.noResult = true; 
                return [];  
              }
              return result;
            })
          );
        }

        if (!firstName && lastName?.length > 2) {
          this.searchText = false;
          return this.customerService.getCustomerByLastName(lastName).pipe(
            map(result => {
              if (!result || result.length === 0) {
                this.noResult = true;
                return [];
              }
              return result;
            })
          );
        }

        if (firstName?.length > 2 && !lastName) {
          this.searchText = false;
          return this.customerService.getCustomerByFirstName(firstName).pipe(
            map(result => {
              if (!result || result.length === 0) {
                this.noResult = true;
                return [];
              }
              return result;
            })
          );
        } else {
          this.searchText = true;
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