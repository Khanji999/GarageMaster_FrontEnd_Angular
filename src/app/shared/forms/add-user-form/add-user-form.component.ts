import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GenericFormComponent } from "../../components/generic-form/generic-form.component";
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { AddingUserDTO, CityContro, CityDTO, CountryContro, CountryDTO, CustomerDTO, DistrictContro, DistrictDTO, EmployeeDTO, RoleContro, RoleDTO, StreetContro, StreetDTO, TenantContro, UserContro } from '../../../core/services/callAPI/api.service';
import { CommonModule } from '@angular/common';
import { SearchCountryField,NgxIntlTelInputModule,  CountryISO } from 'ngx-intl-tel-input';
import { ToastrService } from 'ngx-toastr';
import { OpenConfirmationDialogGenericComponent } from "../../components/open-confirmation-dialog-generic/open-confirmation-dialog-generic.component";

@Component({
  selector: 'app-add-user-form',
  imports: [GenericFormComponent, NgxIntlTelInputModule, ReactiveFormsModule, CommonModule, OpenConfirmationDialogGenericComponent],
  templateUrl: './add-user-form.component.html',
  styleUrl: './add-user-form.component.scss'
})
export class AddUserFormComponent implements OnInit{

  @Output() closeForm = new EventEmitter<void>(); 

  iamUpdate = false;

  newUser?: AddingUserDTO; 
  form!:FormGroup;

  username: string = '';
  subDomain? : string ;

  classC="px-3 py-2 w- text-md text-gray-800 dark:text-gray-100 input-class sm:w-1/2 p-2 bg-white dark:bg-[#2a2b2f] rounded border border-gray-300 dark:border-gray-700 focus:border-[#6B7C9D] focus:ring-3 focus:ring-[#6B7C9D] focus:outline-none";
  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.Lebanon, CountryISO.SaudiArabia ,CountryISO.UnitedArabEmirates, CountryISO.Qatar ];
  
  countries: CountryDTO[] = [];
  cities : CityDTO[]=[];
  districts : DistrictDTO[] = [];
  streets : StreetDTO[] =[];

  roles: RoleDTO[] = [];
  selectedRole = 0;
  showConfirm = false;

  constructor(private fb: FormBuilder,
              private tenantContro : TenantContro,
              private roleContro : RoleContro,
              private countryContro : CountryContro,
              private cityContro : CityContro,
              private districtContro : DistrictContro,
              private streetContro : StreetContro,
              private toastr: ToastrService,
              private userContro : UserContro
  ){}
ngOnInit(): void {
  this.newUser = new AddingUserDTO();
  this.newUser.employees = [new EmployeeDTO()];
  this.newUser.customers = [new CustomerDTO()];

  this.form = this.fb.group({
    userName: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]*$')]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    roleId: ['', Validators.required],

    // Customer fields
    firstName: [''],
    FatherName: [''],
    lastName: [''],
    phoneNumber: [''],
    country: [''],
    city: [''],
    District: [''],
    street: [''],
    theGender: ['Male'],

    // Employee fields
    EmpfirstName: [''],
    EmpFatherName: [''],
    EmplastName: [''],
    EmpphoneNumber: [''],
    Empcountry: [''],
    Empcity: [''],
    EmpDistrict: [''],
    Empstreet: [''],
    EmptheGender: ['Male'],
  }, {
    validators: this.matchPasswords('password', 'confirmPassword')
  });

  this.form.get('userName')?.valueChanges.subscribe(val => {
    this.newUser!.userName = val;
    this.username = val;
    this.newUser!.subDomain= this.subDomain;
  });

  this.form.get('confirmPassword')?.valueChanges.subscribe(val => {
    this.newUser!.password = val;
  });

  this.form.get('roleId')?.valueChanges.subscribe(roleId => {
    this.selectedRole = roleId;
    this.newUser!.roleId = roleId;
    this.removeRoleSpecificFields();
    if (roleId == 3) {
      this.addCustomerFields();
      this.form.get('country')?.valueChanges.subscribe((countryID: number) => {
        this.cities = [];
        this.streets = [];
        this.districts = [];
        this.form.patchValue({ city: "", District: "", street: "" });
        if (countryID) this.getAllCitiesByCountryIDforUI(countryID);
      });

      this.form.get('city')?.valueChanges.subscribe((CityID: number) => {
        this.streets = [];
        this.districts = [];
        this.form.patchValue({ District: "", street: "" });
        if (CityID) this.getAllDistrictsByCityIDforUI(CityID);
      });

      this.form.get('District')?.valueChanges.subscribe((DistrictID: number) => {
        this.form.patchValue({ street: "" });
        if (DistrictID) this.getAllStreetsByDistrictIDforUI(DistrictID);
        else this.streets = [];
      });

      this.form.get('firstName')?.valueChanges.subscribe(val => {
        this.newUser!.customers![0].firstName = val;
      });
      this.form.get('FatherName')?.valueChanges.subscribe(val => {
        this.newUser!.customers![0].fatherName = val;
      });
      this.form.get('lastName')?.valueChanges.subscribe(val => {
        this.newUser!.customers![0].lastName = val;
      });
      this.form.get('street')?.valueChanges.subscribe(val => {
        this.newUser!.customers![0].streetId = val;
      });
      this.form.get('theGender')?.valueChanges.subscribe(val => {
        console.log(val);
      this.newUser!.customers![0].genderId = val == 'Male' ? 1 : 2;
      console.log(this.newUser!.customers![0].genderId);
      });

    } else {
      // 🔵 Employee role
      this.addEmployeeFields();
      this.form.get('Empcountry')?.valueChanges.subscribe((countryID: number) => {
        this.cities = [];
        this.streets = [];
        this.districts = [];
        this.form.patchValue({ city: "", District: "", street: "" });
        if (countryID) this.getAllCitiesByCountryIDforUI(countryID);
      });

      this.form.get('Empcity')?.valueChanges.subscribe((CityID: number) => {
        this.streets = [];
        this.districts = [];
        this.form.patchValue({ District: "", street: "" });
        if (CityID) this.getAllDistrictsByCityIDforUI(CityID);
      });

      this.form.get('EmpDistrict')?.valueChanges.subscribe((DistrictID: number) => {
        this.form.patchValue({ street: "" });
        if (DistrictID) this.getAllStreetsByDistrictIDforUI(DistrictID);
        else this.streets = [];
      });

      this.form.get('EmpfirstName')?.valueChanges.subscribe(val => {
        this.newUser!.employees![0].firstName = val;
      });
      this.form.get('EmpFatherName')?.valueChanges.subscribe(val => {
        this.newUser!.employees![0].fatherName = val;
      });
      this.form.get('EmplastName')?.valueChanges.subscribe(val => {
        this.newUser!.employees![0].lastName = val;
      });
      this.form.get('EmpphoneNumber')?.valueChanges.subscribe(val => {
        this.newUser!.employees![0].phoneNumber = val?.nationalNumber;
        this.newUser!.employees![0].countryCode = val?.dialCode;
        this.newUser!.employees![0].nationalityId = 1;
      });
      this.form.get('Empstreet')?.valueChanges.subscribe(val => {
        this.newUser!.employees![0].streetId = val;
      });
      this.form.get('EmptheGender')?.valueChanges.subscribe(val => {
      console.log(val);
      this.newUser!.employees![0].genderId = val == 'Male' ? 1 : 2;
      console.log(this.newUser!.employees![0].genderId)
      });
    }
  });

  this.getTenantName();
  this.getRoles();
  this.getAllCountryforUI();
}
  getTenantName(): void {
    this.tenantContro.getCurrentTenant().subscribe((response) => {
      this.subDomain = response.result!.name;
    });
  }
  getRoles(){
    this.roleContro.getAll().subscribe(
      (response ) => { this.roles = response.result!}
    )
  }
  private removeRoleSpecificFields() {
  const fieldsToRemove = [
    'firstName', 'FatherName', 'lastName', 'phoneNumber',
    'country', 'city', 'District', 'street', 'theGender',
    'EmpfirstName', 'EmpFatherName', 'EmplastName', 'EmpphoneNumber',
    'Empcountry', 'Empcity', 'EmpDistrict', 'Empstreet', 'EmptheGender'
  ];

  fieldsToRemove.forEach(field => {
    if (this.form.contains(field)) {
      this.form.removeControl(field);
    }
  });
  }
  private addEmployeeFields() {
  this.form.addControl('EmpfirstName', this.fb.control('', Validators.required));
  this.form.addControl('EmpFatherName', this.fb.control('', Validators.required));
  this.form.addControl('EmplastName', this.fb.control('', Validators.required));
  this.form.addControl('EmpphoneNumber', this.fb.control('', Validators.required));
  this.form.addControl('Empcountry', this.fb.control('', Validators.required));
  this.form.addControl('Empcity', this.fb.control('', Validators.required));
  this.form.addControl('EmpDistrict', this.fb.control('', Validators.required));
  this.form.addControl('Empstreet', this.fb.control('', Validators.required));
  this.form.addControl('EmptheGender', this.fb.control('Male', Validators.required));
  }
  private addCustomerFields() {
  this.form.addControl('firstName', this.fb.control('', Validators.required));
  this.form.addControl('FatherName', this.fb.control('', Validators.required));
  this.form.addControl('lastName', this.fb.control('', Validators.required));
  this.form.addControl('phoneNumber', this.fb.control('', Validators.required));
  this.form.addControl('country', this.fb.control('', Validators.required));
  this.form.addControl('city', this.fb.control('', Validators.required));
  this.form.addControl('District', this.fb.control('', Validators.required));
  this.form.addControl('street', this.fb.control('', Validators.required));
  this.form.addControl('theGender', this.fb.control('Male', Validators.required));
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
  closeMenu() {
    this.closeForm.emit(); 
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      console.log(1)
    }
    else{
      console.log(this.newUser)
      this.showConfirm = true;
    }
  }
  onConfirm() {
    this.userContro.addUserWithEmpOrCust(this.newUser).subscribe(
      (response) => {
        if(response.statusCode == 200){
          this.toastr.success('A new User Was Added');
          this.closeMenu();
          this.onCancel();
        }
      }
    )
  }
  
  onCancel() {
    this.showConfirm = false;
  }
}
