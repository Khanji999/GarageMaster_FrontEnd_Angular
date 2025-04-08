import { Routes } from '@angular/router';
import { HomeComponent } from './shared/features/home/home.component';
import { LoginComponent } from './shared/features/login/login.component';
import { noAccessAfterLoginGuard } from './core/guards/no-access-after-login.guard';
import { DashboardComponent } from './shared/features/dashboard/dashboard.component';
import { noAccessBeforeLoginGuard } from './core/guards/no-access-before-login.guard';
import { ViewCustomerCarsComponent } from './shared/forms/view-customer-cars/view-customer-cars.component';
import { GetAllMaintenancesComponent } from './shared/features/maintenance/get-all-maintenances/get-all-maintenances.component';
import { AddingMaintenanceComponent } from './shared/features/maintenance/adding-maintenance/adding-maintenance.component';
import { UserPageComponent } from './shared/features/user-page/user-page.component';
import { RouteGuard } from './core/guards/route.guard';
import { FourZeroThreeComponent } from './shared/features/status-code/four-zero-three/four-zero-three.component';
import { AddingMainteanceP2Component } from './shared/features/maintenance/adding-mainteance-p2/adding-mainteance-p2.component';


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
        component: AddingMaintenanceComponent,
        title: 'Adding New Maintenance',
        canActivate:[noAccessBeforeLoginGuard , RouteGuard],
        data: { myTitle: 'Adding New Maintenance'},
    },
    {
        path:'customerVehicles',
        component: ViewCustomerCarsComponent,
        title:'Customer Vehicles',
        data: { myTitle: 'List of Customer\'s Vehicles' },
        canActivate:[noAccessBeforeLoginGuard, RouteGuard],
    },
    {
        path:'MaintenanceCard',
        component: AddingMainteanceP2Component,
        title:'MaintenanceCard',
        data: { myTitle: 'Maintenance Card' },
        canActivate:[noAccessBeforeLoginGuard],
    },
    //---------
    {
        path:'app-user-page',
        component: UserPageComponent,
        title:'user',
        data: { myTitle: 'Userr' },
        canActivate:[noAccessBeforeLoginGuard , RouteGuard],
    },
    {  
        path: 'view-all-maintenance',
        component: GetAllMaintenancesComponent,
        title: 'View Maintenance',
        canActivate:[noAccessBeforeLoginGuard , RouteGuard ],
        data: { myTitle: 'View Maintenance'}
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
