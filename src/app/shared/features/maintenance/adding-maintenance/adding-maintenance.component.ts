import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, of, debounceTime, switchMap, distinctUntilChanged, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AddNewCustomerDTO, CustomerDTO, UserDTO } from '../../../../core/services/callAPI/api.service';
import { CustomerService } from '../../../../core/services/customerService/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SendformCustomerSearchToCustomerCarsService } from '../../../../core/services/sendformCustomerSearchToCustomerCars/sendform-customer-search-to-customer-cars.service';
import { CountryISO, NgxIntlTelInputModule, SearchCountryField } from 'ngx-intl-tel-input';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { PermissionService } from '../../../../core/services/permissionService/permission.service';
import { AddCustomerFormComponent } from "../../../forms/add-customer-form/add-customer-form.component";

@Component({
  selector: 'app-adding-maintenance', 
  imports: [CommonModule, ReactiveFormsModule, NgxIntlTelInputModule, AddCustomerFormComponent],
  templateUrl: './adding-maintenance.component.html',
  styleUrl: './adding-maintenance.component.scss',
  animations: [
    trigger('cardAnimation', [
      state('void', style({ opacity: 0, transform: 'translateY(20px)' })),
      transition(':enter', [
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
  ]
})

export class AddingMaintenanceComponent implements OnInit {
  // Relate to Permissions
  viewGetCustomerByFirstName = false;  
  viewGetCustomerByLastName = false;  
  viewGetCustomerByFirstAndLastName = false;
  viewGetCustomerByPhoneNumber = false;
  viewRelatedToTheSearch = false;
  viewAddNewCustomer = false;
  //


  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.Lebanon, CountryISO.SaudiArabia ,CountryISO.UnitedArabEmirates, CountryISO.Qatar ];
  
  form!: FormGroup;
  customers$: Observable<CustomerDTO[]> = of([]);
  selectedCustomer: CustomerDTO | null = null;
  searchText = true // title for searching new customer
  noResult = false; // title : no result no customer was found
  openCustomerAddingForm = false;

  constructor(
    private formBuilder: FormBuilder,
    public customerService: CustomerService,
    private router: Router,
    private sender: SendformCustomerSearchToCustomerCarsService,
    private helloPermission : PermissionService
  ) {}


  ngOnInit(): void {
      this.form = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      phoneNumber: ['',Validators.required],
    });
    
    this.viewGetCustomerByPhoneNumber = this.helloPermission.hasPermission('CustomerContro','searchForCustomerByPhoneNumber')
    this.viewGetCustomerByFirstName = this.helloPermission.hasPermission('CustomerContro','searchForCustomerByFirstName') 
    this.viewGetCustomerByLastName = this.helloPermission.hasPermission('CustomerContro','searchForCustomerByLastName') 
    this.viewGetCustomerByFirstAndLastName = this.helloPermission.hasPermission('CustomerContro','searchForCustomerByFirstAndLastName');
    this.viewRelatedToTheSearch = this.viewGetCustomerByPhoneNumber || this.viewGetCustomerByFirstName || this.viewGetCustomerByLastName
                          this.viewGetCustomerByFirstAndLastName
    this.viewAddNewCustomer = this.helloPermission.hasPermission('CustomerContro','Add');


    this.customers$ = this.form.valueChanges.pipe(
      debounceTime(340),
      distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)),
      switchMap(({ firstName, lastName , phoneNumber }) => {
        this.noResult = false; 
        
        if (firstName?.length > 2 && lastName?.length > 0) {
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

        else if (!firstName && lastName?.length > 2) {
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

        else if (firstName?.length > 2 && !lastName) {
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
        }

        else if (this.form.get('phoneNumber')?.valid) {          
          this.searchText = false;
          console.log(phoneNumber.nationalNumber)
          return this.customerService.ByPhoneNumberGetCustomer(phoneNumber.nationalNumber).pipe(
            map(result => {
              if (!result || result.length === 0) {
                this.noResult = true; 
                return [];  
              }
              return result;
            })
          );
        }
        else {
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

  openFormToAddCustomer(){
    if(this.viewAddNewCustomer){
        this.openCustomerAddingForm = true;
    }
  }
  
  handleAddCustomer(newCustomer : AddNewCustomerDTO){
    if(this.openCustomerAddingForm){
     var requestTheNewCustomer = new AddNewCustomerDTO();
     requestTheNewCustomer = newCustomer;
      this.customerService.addNewCustomer(requestTheNewCustomer).subscribe(
        (response: UserDTO) => {
          console.log(response);
        },
      (error) => {
        console.error('Error ', error);
      }
      );
    }
  }
}
