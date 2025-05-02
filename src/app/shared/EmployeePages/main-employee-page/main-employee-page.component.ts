import { Component, OnInit } from '@angular/core';
import { GenericTableComponent } from "../../components/generic-table/generic-table.component";
import { EmployeeContro, EmployeeWithDetails2DTO, EmployeeWithDetailsDTO } from '../../../core/services/callAPI/api.service';
import { AppEmployeeFormComponent } from "../../forms/app-employee-form/app-employee-form.component";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-main-employee-page',
  imports: [GenericTableComponent, AppEmployeeFormComponent],
  templateUrl: './main-employee-page.component.html',
  styleUrl: './main-employee-page.component.scss'
})
export class MainEmployeePageComponent implements OnInit {
  employees?: EmployeeWithDetailsDTO[] | any
  columns = [
    { header: 'First Name', key: 'firstName' }, 
    { header: 'Last Name', key: 'lastName' },     
    { header: 'Father Name', key: 'fatherName' },     
    { header: 'Username', key: 'processedData' },  
    { header: 'Role', key: 'user.role.name' },    
    { header: 'Gender', key: 'gender.name' },        
    { header: 'Phone Number', key: 'processedData2' },    
    { header: 'Nationality', key: 'nationality.name' },     
  ]
  isFormOpenToAddEmp = false;
  constructor(
  private employeeContro :EmployeeContro,   
  ){}
  ngOnInit(): void {
    this.getAllEmployees();
  }
  getAllEmployees(){
    this.employeeContro.getAllEmployeesWithDetails().subscribe
    ((response) =>{
      console.log(response?.result)
      this.employees = response?.result?.map((emp: any) => ({
        ...emp, 
        processedData: `${emp.user.user.userName}@${emp.user.user.subDomain}`,
        processedData2: `${emp.countryCode} ${emp.phoneNumber}`
      }));
    })
  }
 
  deleteVehicle($event: any) {
  throw new Error('Method not implemented.');
  }
  updateVehicle($event: any) {
  throw new Error('Method not implemented.');
  }
  openEmployeeForm() {
    this.isFormOpenToAddEmp = true;
  }

}
