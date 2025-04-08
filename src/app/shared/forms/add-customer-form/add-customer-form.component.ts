import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AddNewCustomerDTO, CityDTO, CountryDTO, CustomerContactNumberDTO, CustomerDTO, DistrictDTO, StreetDTO, UserDTO } from '../../../core/services/callAPI/api.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CountryISO, NgxIntlTelInputModule, SearchCountryField } from 'ngx-intl-tel-input';
import { AddressService } from '../../../core/services/addressService/address.service';

@Component({
  selector: 'app-add-customer-form',
  imports: [ReactiveFormsModule, NgxIntlTelInputModule,CommonModule],
  templateUrl: './add-customer-form.component.html',
  styleUrl: './add-customer-form.component.scss'
})
export class AddCustomerFormComponent implements OnInit {
  @Output() closeForm = new EventEmitter<void>(); 
  @Output() submitForm = new EventEmitter<AddNewCustomerDTO>(); 
  form!: FormGroup;

  countries: CountryDTO[] = [];
  cities : CityDTO[]=[];
  districts : DistrictDTO[] = [];
  streets : StreetDTO[] =[];

  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.Lebanon, CountryISO.SaudiArabia ,CountryISO.UnitedArabEmirates, CountryISO.Qatar ];
  

  constructor(private fb: FormBuilder, private addressService : AddressService ){}

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      fatherName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      District: ['', Validators.required],
      street: ['', Validators.required],
      theGender: ['Male', Validators.required],
    });
  
    this.getAllCountryforUI();
  
    this.form.get('country')?.valueChanges.subscribe((countryID: number) => {
      if (countryID) {
        this.getAllCitiesByCountryIDforUI(countryID);
        this.form.patchValue({ city: "", District: "", street: "" }); 
      } else {
        this.form.patchValue({ city: "", District: "", street: "" });
      }
    });
  
    this.form.get('city')?.valueChanges.subscribe((CityID: number) => {
      if (CityID) {
        this.getAllDistrictsByCityIDforUI(CityID);
        this.form.patchValue({ District: "", street: "" });
      } else {
        this.form.patchValue({ District: "", street: "" });
      }
    });
  
    this.form.get('District')?.valueChanges.subscribe((DistrictID: number) => {
      if (DistrictID) {
        this.getAllStreetsByDistrictIDforUI(DistrictID);
        this.form.patchValue({ street: "" }); 
      } else {
        this.streets = [];
        this.form.patchValue({ street: "" });
      }
    });
  }

  getAllCountryforUI(): void{
    this.addressService.getAllCountries().subscribe(
      (response :any) => {
        this.countries = response;
      },
      (error) => {
        console.error('Error fetching Countries:', error);
      }
    );  
  }
  
  getAllCitiesByCountryIDforUI(countrid : number): void{
    this.addressService.getAllCities(countrid).subscribe(
      (response :any) => {
        this.cities = response;
      },
      (error) => {
        console.error('Error fetching Cities:', error);
      }
    );  
  }
  
  getAllDistrictsByCityIDforUI(cityID : number): void{
    this.addressService.getAllDistrictsByCityID(cityID).subscribe(
      (response :any) => {
        this.districts = response;
      },
      (error) => {
        console.error('Error fetching Districts:', error);
      }
    );  
  }

  getAllStreetsByDistrictIDforUI(DistrictID : number): void{
    this.addressService.getAllStreetsByDistrictID(DistrictID).subscribe(
      (response :any) => {
        this.streets = response;
      },
      (error) => {
        console.error('Error fetching Districts:', error);
      }
    );  
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    }
  
    if (this.form.valid) {
      const dto = new AddNewCustomerDTO();
      dto.customer = new CustomerDTO();
      dto.customerContactNumber = new CustomerContactNumberDTO();
      dto.user = new UserDTO();
      dto.user.userName ="test";
      dto.user.password="test";

      dto.customer.firstName = this.form.value.firstName;
      dto.customer.fatherName = this.form.value.fatherName;
      dto.customer.lastName = this.form.value.lastName;
      dto.customer.genderId = this.form.value.theGender === "Male" ? 1 : 2;
      dto.customer.streetId = this.form.value.street;
  
      if (this.form.value.phoneNumber) {
        dto.customerContactNumber.number = this.form.value.phoneNumber.nationalNumber;
        dto.customerContactNumber.countryCode = this.form.value.phoneNumber.dialCode;
      } else {
        console.error("Phone number is missing!");
      }
  
      console.log("Sending DTO:", dto);
      this.submitForm.emit(dto);
      this.closeFormAndDestroy();
    }
  }
  
  closeFormAndDestroy(): void {
    this.closeForm.emit(); 
  }
}
