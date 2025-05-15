import { Routes } from '@angular/router';
import { HomeComponent } from './shared/features/home/home.component';
import { LoginComponent } from './shared/features/login/login.component';
import { noAccessAfterLoginGuard } from './core/guards/no-access-after-login.guard';
import { DashboardComponent } from './shared/features/dashboard/dashboard.component';
import { noAccessBeforeLoginGuard } from './core/guards/no-access-before-login.guard';
import { GetAllMaintenancesComponent } from './shared/MaintenancePages/get-all-maintenances/get-all-maintenances.component';
import { RouteGuard } from './core/guards/route.guard';
import { FourZeroThreeComponent } from './shared/features/status-code/four-zero-three/four-zero-three.component';
import { FirstSearchForCustomerComponent } from './shared/MaintenancePages/first-search-for-customer/first-search-for-customer.component';
import { UserPageComponent } from './shared/features/user-page/user-page.component';
import { MainEmployeePageComponent } from './shared/EmployeePages/main-employee-page/main-employee-page.component';
import { VehicleBrandMangementComponent } from './shared/vehiclePages/vehicle-brand-mangement/vehicle-brand-mangement.component';
import { VehicleModelMangementComponent } from './shared/vehiclePages/vehicle-model-mangement/vehicle-model-mangement.component';
import { MyMaintenanceComponent } from './shared/MaintenancePages/my-maintenance/my-maintenance.component';
import { MyVehicleComponent } from './shared/vehiclePages/my-vehicle/my-vehicle.component';
import { ViewAllVehicleComponent } from './shared/vehiclePages/view-all-vehicle/view-all-vehicle.component';

export const routes: Routes = [
    {
        path:'',
        component: HomeComponent,
        canActivate:[noAccessAfterLoginGuard],
    },
    {
        path:'login',
        component: LoginComponent,
        canActivate:[noAccessAfterLoginGuard],
    },
    {
        path:'dashboard',
        component: DashboardComponent,
        title:'Dashboard',
        data: { myTitle: 'Dashboard' },
        canActivate:[RouteGuard, noAccessBeforeLoginGuard],
    },
    // Business
    {  
        path: 'add-new-maintenance',
        component: FirstSearchForCustomerComponent,
        title: 'Adding New Maintenance',
        canActivate:[noAccessBeforeLoginGuard , RouteGuard],
        data: { myTitle: 'Adding New Maintenance'},
    },
    {  
        path: 'view-all-maintenance',
        component: GetAllMaintenancesComponent,
        title: 'View Maintenance',
        canActivate:[noAccessBeforeLoginGuard , RouteGuard ],
        data: { myTitle: 'View Maintenance'}
    },
    {  
        path: 'users',
        component: UserPageComponent,
        title: 'User Management',
        canActivate:[noAccessBeforeLoginGuard , RouteGuard ],
        data: { myTitle: 'User Management'}
    },
    {  
        path: 'EmployeeMangement',
        component: MainEmployeePageComponent,
        title: 'Employee Mangement',
        canActivate:[noAccessBeforeLoginGuard , RouteGuard ],
        data: { myTitle: 'Employee Mangement'}
    },
    {  
        path: 'VehicleBrandMangement',
        component: VehicleBrandMangementComponent,
        title: 'Vehicle Brand Mangement',
        canActivate:[noAccessBeforeLoginGuard , RouteGuard ],
        data: { myTitle: 'Vehicle Brand Mangement'}
    },
    {  
        path: 'VehicleModelMangement',
        component: VehicleModelMangementComponent,
        title: 'Vehicle Model Mangement',
        canActivate:[noAccessBeforeLoginGuard , RouteGuard ],
        data: { myTitle: 'Vehicle Model Mangement'}
    },
    {  
        path: 'MyCurrentMaintenance',
        component: MyMaintenanceComponent,
        title: 'My Current Maintenance',
        canActivate:[noAccessBeforeLoginGuard , RouteGuard ],
        data: { myTitle: 'My Current Maintenance'}
    },
    {  
        path: 'ViewAllVehicles',
        component: ViewAllVehicleComponent,
        title: 'View Vehicles',
        canActivate:[noAccessBeforeLoginGuard , RouteGuard ],
        data: { myTitle: 'View Vehicles'}
    },
    {  
        path: 'MyVehicle',
        component: MyVehicleComponent,
        title: 'MyVehicle',
        canActivate:[noAccessBeforeLoginGuard , RouteGuard ],
        data: { myTitle: 'MyVehicle'}
    },
    {  
        path: 'AccessDenied',
        component: FourZeroThreeComponent,
        title: 'Access Denied',
        data: { myTitle: '403'},  
    },
    {
        path: '**',
        redirectTo:'',
        canActivate:[noAccessBeforeLoginGuard],
        data: { myTitle: 'map' }
    },
];
