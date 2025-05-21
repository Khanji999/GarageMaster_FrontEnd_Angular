import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryISO, NgxIntlTelInputModule, SearchCountryField } from 'ngx-intl-tel-input';
import { AddCustomerFormComponent } from '../../forms/add-customer-form/add-customer-form.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { debounceTime, distinctUntilChanged, map, Observable, of, switchMap } from 'rxjs';
import { AddNewCustomerDTO, CustomerContro, CustomerDTO, CustomerUserContro, CustomerVehicleWithDetailsDTO, MaintenaceCardDTO, MaintenanceCardWithFullDetailsDTO, UserDTO } from '../../../core/services/callAPI/api.service';
import { PermissionService } from '../../../core/services/permissionService/permission.service';
import { SecondSelectACarComponent } from "../second-select-acar/second-select-acar.component";
import { ThirdViewSelectedVehicleComponent } from "../third-view-selected-vehicle/third-view-selected-vehicle.component";
import { FourthViewMaintenanceComponent } from "../fourth-view-maintenance/fourth-view-maintenance.component";
import { FifthAddServicesComponent } from "../fifth-add-services/fifth-add-services.component";

@Component({
  selector: 'app-first-search-for-customer',
  imports: [CommonModule, ReactiveFormsModule, NgxIntlTelInputModule, AddCustomerFormComponent, SecondSelectACarComponent, ThirdViewSelectedVehicleComponent, FourthViewMaintenanceComponent, FifthAddServicesComponent],
  templateUrl: './first-search-for-customer.component.html',
  styleUrl: './first-search-for-customer.component.scss',
  animations: [
      trigger('cardAnimation', [
        state('void', style({ opacity: 0, transform: 'translateY(20px)' })),
        transition(':enter', [
          animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
        ])
      ]),
    ]
})
export class FirstSearchForCustomerComponent implements OnInit {
  // Related to Permissions
  viewGetCustomerByFirstName = false;  
  viewGetCustomerByLastName = false;  
  viewGetCustomerByFirstAndLastName = false;
  viewGetCustomerByPhoneNumber = false;
  viewRelatedToTheSearch = false;
  viewAddNewCustomer = false;
  //

  //  Releated to Phone NGX
  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.Lebanon, CountryISO.SaudiArabia ,CountryISO.UnitedArabEmirates, CountryISO.Qatar ];
  classC="w-full px-3 py-2 text-gray-800 dark:text-gray-100 bg-white dark:bg-[#2a2b2f] rounded-lg border border-gray-300 dark:border-gray-600 focus:border-[#6B7C9D] focus:ring-3 focus:ring-[#6B7C9D] focus:outline-none shadow-sm transition-all duration-200";
  //
  // For Parent
  form!: FormGroup;
  customers$: Observable<CustomerDTO[]> | undefined= of([]);
  searchText = true // title for searching new customer
  noResult = false; // title : no result no customer was found
  //

  openCustomerAddingForm = false;

  selectedCustomer: CustomerDTO | any = null;
  secondStep = false;

  thirdStep = false;
  selectedVehicle: CustomerVehicleWithDetailsDTO | any = null ;

  fourthStep = false;
  // km 

  fifthStep = false;

  createdMaintenance : MaintenanceCardWithFullDetailsDTO | any = null;

  constructor(
    private formBuilder: FormBuilder,
    private customerContro :  CustomerContro,
    private helloPermission : PermissionService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      phoneNumber: ['',Validators.required],
    });
    
    //permissions
    this.viewGetCustomerByPhoneNumber = this.helloPermission.hasPermission('CustomerContro','searchForCustomerByPhoneNumber')
    this.viewGetCustomerByFirstName = this.helloPermission.hasPermission('CustomerContro','searchForCustomerByFirstName') 
    this.viewGetCustomerByLastName = this.helloPermission.hasPermission('CustomerContro','searchForCustomerByLastName') 
    this.viewGetCustomerByFirstAndLastName = this.helloPermission.hasPermission('CustomerContro','searchForCustomerByFirstAndLastName');
    this.viewRelatedToTheSearch = this.viewGetCustomerByPhoneNumber || this.viewGetCustomerByFirstName || this.viewGetCustomerByLastName
                          this.viewGetCustomerByFirstAndLastName
    this.viewAddNewCustomer = this.helloPermission.hasPermission('CustomerUserContro','AddNewCustomer');
    // Pipe to search for customer
    this.customers$ = this.form.valueChanges.pipe(
      debounceTime(340),
      distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)),
      switchMap(({ firstName, lastName, phoneNumber }): Observable<CustomerDTO[]> => {
        this.noResult = false;

        if (firstName?.length > 2 && lastName?.length > 0) {
          this.searchText = false;
          return this.customerContro.searchForCustomerByFirstAndLastName(firstName, lastName).pipe(
            map(response => {
              const result = response?.result ?? [];
              if (result.length === 0) this.noResult = true;
              return result;
            })
          );
        }

        if (!firstName && lastName?.length > 2) {
          this.searchText = false;
          return this.customerContro.searchForCustomerByLastName(lastName).pipe(
            map(response => {
              const result = response?.result ?? [];
              if (result.length === 0) this.noResult = true;
              return result;
            })
          );
        }

        if (firstName?.length > 2 && !lastName) {
          this.searchText = false;
          return this.customerContro.searchForCustomerByFirstName(firstName).pipe(
            map(response => {
              const result = response?.result ?? [];
              if (result.length === 0) this.noResult = true;
              return result;
            })
          );
        }

        if (this.form.get('phoneNumber')?.valid) {
          this.searchText = false;
          return this.customerContro.searchForCustomerByPhoneNumber(phoneNumber.nationalNumber).pipe(
            map(response => {
              const result = response?.result;
              if (!result) {
                this.noResult = true;
                return [];
              }
              return [result];
            })
          );
        }

        this.searchText = true;
        return of([]); // fallback
      })
    );
  }
  // For Adding A customer 
  openFormToAddCustomer(){
    if(this.viewAddNewCustomer){
        this.openCustomerAddingForm = true;
    }
  }
  
  removeSearch(){
    this.selectedCustomer = null
    this.form.reset(); 
  }  
  // when select customer the first child ( second step ) will appear
  handleSelectCustomer(customer: CustomerDTO){
    this.selectedCustomer = customer; 
    this.secondStep = true;
  }       
  // when select a vehicle second child ( third step ) will appear
  handleVehicleSelection($event: CustomerVehicleWithDetailsDTO) {
    this.selectedVehicle = $event;
    this.thirdStep = true; }
    // when add a km third child ( 4 step ) will appear
  getAddedMaitenance($event: MaintenanceCardWithFullDetailsDTO) {
    this.createdMaintenance = $event;
    this.fourthStep = true;
  }

  moveToService() {
    this.fourthStep = false;
    this.fifthStep = true;
  }
}

