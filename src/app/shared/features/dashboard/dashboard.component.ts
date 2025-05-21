import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerContro, EmployeeContro, MaintenaceCardContro, MaintenanceCardWithFullDetailsDTO, UserContro } from '../../../core/services/callAPI/api.service';
import { GenericRadialCounterChartComponent } from "../../components/generic-radial-counter-chart/generic-radial-counter-chart.component";
import { PermissionService } from '../../../core/services/permissionService/permission.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
 
})
export class DashboardComponent {

  maintenance? : MaintenanceCardWithFullDetailsDTO[];
  
  customerCount = 0;
  employeeCount = 0;
  userCount = 0;

  canSeeNumbOfCust = false;
  canSeeNumbOfEmp = false;
  canSeeNumbOfUser = false;
  carSeeMaintCard = false;

  constructor(
    private customerContro: CustomerContro,
    private employeeContro: EmployeeContro,
    private userContro: UserContro,
    private helloPermission : PermissionService,
    private maintenanceContro: MaintenaceCardContro
    
  ) {}
  ngOnInit(): void {
    // this.canSeeNumbOfCust = this.helloPermission.hasPermission("CustomerContro","getNumberOfCustomers")
    // this.canSeeNumbOfEmp = this.helloPermission.hasPermission("EmployeeContro","getNumberOfEmployees")
    // this.canSeeNumbOfUser = this.helloPermission.hasPermission("UserContro","getNumberOfUsers")
    this.carSeeMaintCard =  this.helloPermission.hasPermission("MaintenaceCardContro","getMaintenanceByCustomerId")
    // if(this.canSeeNumbOfCust == true){
    //   this.customerContro.getNumberOfCustomers().subscribe(res => {
    //     this.customerCount = res.result!;
    //   });
    // }
    // if(this.canSeeNumbOfEmp == true){
    //   this.employeeContro.getNumberOfEmployees().subscribe(res => {
    //     this.employeeCount = res.result!;
    //   });
    // }
    // if(this.canSeeNumbOfUser == true){
    //   this.userContro.getNumberOfUsers().subscribe(res => {  
    //     this.userCount = res.result!;
    //   });
    // }
    if(this.carSeeMaintCard ==true){
      this.maintenanceContro.getMaintenanceByCustomerId().subscribe(
        (response) => {
          this.maintenance = response.result!
        }
      )
    }
  }
}
