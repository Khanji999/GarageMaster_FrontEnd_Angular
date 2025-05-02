import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AddNewCustomerDTO, CityContro, CityDTO, CountryContro, CountryDTO, CustomerContactNumberDTO, CustomerDTO, DistrictContro, DistrictDTO, StreetContro, StreetDTO, UserDTO } from '../../../core/services/callAPI/api.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CountryISO, NgxIntlTelInputModule, SearchCountryField } from 'ngx-intl-tel-input';
import { map } from 'rxjs';
import { OpenConfirmationDialogGenericComponent } from "../../components/open-confirmation-dialog-generic/open-confirmation-dialog-generic.component";
import { GenericFormComponent } from "../../components/generic-form/generic-form.component";

@Component({
  selector: 'app-add-customer-form',
  imports: [ReactiveFormsModule, NgxIntlTelInputModule, CommonModule, OpenConfirmationDialogGenericComponent, GenericFormComponent],
  templateUrl: './add-customer-form.component.html',
  styleUrl: './add-customer-form.component.scss'
})
export class AddCustomerFormComponent implements OnInit {
  classC="px-3 py-2 text-md text-gray-800 dark:text-gray-100 input-class w-full sm:w-1/2 p-2 bg-white dark:bg-[#2a2b2f] rounded border border-gray-300 dark:border-gray-700 focus:border-[#6B7C9D] focus:ring-3 focus:ring-[#6B7C9D] focus:outline-none";

  @Output() closeForm = new EventEmitter<void>(); 
  @Output() submitForm = new EventEmitter<AddNewCustomerDTO>(); 
  form!: FormGroup;
  showConfirm = false;
  private pendingDTO!: AddNewCustomerDTO;


  countries: CountryDTO[] = [];
  cities : CityDTO[]=[];
  districts : DistrictDTO[] = [];
  streets : StreetDTO[] =[];

  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.Lebanon, CountryISO.SaudiArabia ,CountryISO.UnitedArabEmirates, CountryISO.Qatar ];
  

  constructor(
    private countryContro : CountryContro,
    private cityContro : CityContro,
    private districtContro : DistrictContro,
    private streetContro : StreetContro,
    private fb: FormBuilder ){}

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
        this.cities = []
        this.streets = []
        this.districts = []
        this.getAllCitiesByCountryIDforUI(countryID);
        this.form.patchValue({ city: "", District: "", street: "" }); 
      } else {
        this.form.patchValue({ city: "", District: "", street: "" });
      }
    });
    this.form.get('city')?.valueChanges.subscribe((CityID: number) => {
      if (CityID) {
        this.streets = []
        this.districts = []
        this.getAllDistrictsByCityIDforUI(CityID);
        this.form.patchValue({ District: "", street: "" });
      } else {
        this.form.patchValue({ District: "", street: "" });
      }
    });
    this.form.get('District')?.valueChanges.subscribe((DistrictID: number) => {
      if (DistrictID) {
        this.districts = []
        this.getAllStreetsByDistrictIDforUI(DistrictID);
        this.form.patchValue({ street: "" }); 
      } else {
        this.streets = [];
        this.form.patchValue({ street: "" });
      }
    });
  }

  getAllCountryforUI(): void{
    this.countryContro.getAll().subscribe(
      (response: any) => {
        this.countries = response.result;
      }
  );  
  }
  
  getAllCitiesByCountryIDforUI(countrid : number): void{
    this.cityContro.getAllCitiesByCountryID(countrid).subscribe(
      (response: any) => {
        this.cities = response.result;
      }
    ); 
  }
  
  getAllDistrictsByCityIDforUI(cityID : number): void{
    this.districtContro.getAllDistictsByCityID(cityID).subscribe(
      (response: any) => {
        this.districts = response.result;
      }
    );
  }

  getAllStreetsByDistrictIDforUI(DistrictID : number): void{
    this.streetContro.getStreetsByDistrictID(DistrictID).subscribe(
      (response: any) => {
        this.streets = response.result;
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
      this.pendingDTO = dto;     
      this.showConfirm = true;   
    }
  }
  
  closeFormAndDestroy(): void {
    this.closeForm.emit(); 
  }

  onConfirm() {
    if (this.pendingDTO) {
      console.log("Sending DTO:", this.pendingDTO);
      this.submitForm.emit(this.pendingDTO);
      this.closeFormAndDestroy();
    }
    this.showConfirm = false;
  }
  
  onCancel() {
    this.showConfirm = false;
    this.pendingDTO = undefined!;
  }
}
