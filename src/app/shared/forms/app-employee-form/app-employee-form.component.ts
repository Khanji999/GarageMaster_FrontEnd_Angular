import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GenericFormComponent } from "../../components/generic-form/generic-form.component";
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { CityContro, CityDTO, CountryContro, CountryDTO, DistrictContro, DistrictDTO, EmployeeContro, EmployeeWithDetails2DTO, EmployeeWithDetailsDTO, NationalityContro, NationalityDTO, RoleContro, RoleDTO, StreetContro, StreetDTO, UserDTO, UserWithRoleDTO } from '../../../core/services/callAPI/api.service';
import { CommonModule, DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { CountryISO, NgxIntlTelInputModule, SearchCountryField } from 'ngx-intl-tel-input';
import { OpenConfirmationDialogGenericComponent } from "../../components/open-confirmation-dialog-generic/open-confirmation-dialog-generic.component";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-form',
  imports: [GenericFormComponent, NgxIntlTelInputModule, ReactiveFormsModule, CommonModule, OpenConfirmationDialogGenericComponent],
  templateUrl: './app-employee-form.component.html',
  styleUrl: './app-employee-form.component.scss'
})
export class AppEmployeeFormComponent implements OnInit {
  @Output() closeForm = new EventEmitter<void>(); 
  @Output() submitForm = new EventEmitter<void>(); 
  form!:FormGroup;

  countries: CountryDTO[] = [];
  cities : CityDTO[]=[];
  districts : DistrictDTO[] = [];
  streets : StreetDTO[] =[];
  roles : RoleDTO[] = []
  nationalities: NationalityDTO[] = []

  currentUserName: string = '';

  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.Lebanon, CountryISO.SaudiArabia ,CountryISO.UnitedArabEmirates, CountryISO.Qatar ];
  classC="px-3 py-2 text-md text-gray-800 dark:text-gray-100 input-class w-[50%] p-2 bg-white dark:bg-[#2a2b2f] rounded border border-gray-300 dark:border-gray-700 focus:border-[#6B7C9D] focus:ring-3 focus:ring-[#6B7C9D] focus:outline-none";

  showConfirm = false;
  pendingDTO : any;
  constructor(
    private countryContro : CountryContro,
    private cityContro : CityContro,
    private districtContro : DistrictContro,
    private streetContro : StreetContro,
    private fb: FormBuilder ,
    private roleContro : RoleContro,
    private nationalityContro : NationalityContro,
    private employeeContro : EmployeeContro,
    private toastr : ToastrService,
  ){}

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      fatherName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['',   [Validators.required, Validators.pattern('^[a-zA-Z0-9]*$')]],
      role: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      theGender: ['Male', Validators.required],
      nationality: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      District: ['', Validators.required],
      street: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    },
    {
      validators: this.matchPasswords('password', 'confirmPassword')
    });
    this.getCountries();
    this.getRoles();
    this.getNationalities();
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
    this.form.controls['userName'].valueChanges.subscribe(value => {
      this.currentUserName = value;
    });
  }

  showPassword = false;
  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  matchPasswords(password: string, confirmPassword: string): ValidatorFn {
    return (formGroup: AbstractControl) => {
      const passwordControl = formGroup.get(password);
      const confirmPasswordControl = formGroup.get(confirmPassword);
  
      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }
  
      if (confirmPasswordControl.errors && !confirmPasswordControl.errors['passwordMismatch']) {
        return null;
      }
  
      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
  
      return null;
    };
  }

  getCountries(): void{
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
  getNationalities(){
    this.nationalityContro.getAll().subscribe(
      (response) => {
        this.nationalities = response.result!
      }
    )
  }
  getRoles() {
    this.roleContro.getAll().subscribe(
      (response) => {
        this.roles = response.result!
        this.roles = this.roles.filter(role => role.name !== 'Customer');
        }
    );
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    }
    if (this.form.valid) {
      const dto = new EmployeeWithDetails2DTO();
      dto.user = new UserDTO();
      dto.firstName = this.form.value.firstName;
      dto.fatherName = this.form.value.fatherName;
      dto.lastName = this.form.value.lastName;
      dto.genderId = this.form.value.theGender === "Male" ? 1 : 2;
      dto.streetId = this.form.value.street;
      dto.nationalityId = this.form.value.nationality
      if (this.form.value.phoneNumber) {
        dto.phoneNumber = this.form.value.phoneNumber.nationalNumber;
        dto.countryCode = this.form.value.phoneNumber.dialCode;
      } else {
        console.error("Phone number is missing!");
      }
      dto.user.userName = this.form.value.userName;
      if(this.form.value.password == this.form.value.confirmPassword)
        dto.user.password = this.form.value.password;
      dto.user.roleId = this.form.value.role;
      dto.user.isActive = true;
      console.log("Sending DTO:", dto);
      dto.user.subDomain = "ExpertVehicle"
      this.pendingDTO = dto;  
      this.showConfirm = true;   
    }
  }
  closeFormAndDestroy(): void {
    this.closeForm.emit(); 
  }
  onConfirm() {
    this.handleAddEmployee(this.pendingDTO);
  }
  onCancel() {
    this.showConfirm = false;
  }

  handleAddEmployee(employee:EmployeeWithDetails2DTO){
      this.employeeContro.addNewEmployee(employee).subscribe(
        (response) => {
          console.log("hdo")

          if(response.statusCode == 200) {
            this.toastr.success("Employee Added");
            this.closeFormAndDestroy();
            this.submitForm.emit(); 
            this.showConfirm = false;
          }
        },
        (error) => {
          console.log("ho")
          this.showConfirm = false;
          this.toastr.error(error.message);
        }
      );
    }
}
