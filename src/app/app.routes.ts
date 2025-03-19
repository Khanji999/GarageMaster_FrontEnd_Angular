import { Routes } from '@angular/router';
import { HomeComponent } from './shared/features/home/home.component';
import { LoginComponent } from './shared/features/login/login.component';
import { AboutUsComponent } from './shared/features/about-us/about-us.component';
import { noAccessAfterLoginGuard } from './core/guards/no-access-after-login.guard';
import { DashboardComponent } from './shared/features/dashboard/dashboard.component';
import { noAccessBeforeLoginGuard } from './core/guards/no-access-before-login.guard';
import { UserPageComponent } from './shared/features/user-page/user-page.component';
import { ViewCustomerCarsComponent } from './shared/forms/view-customer-cars/view-customer-cars.component';
import { GetAllMaintenancesComponent } from './shared/features/maintenance/get-all-maintenances/get-all-maintenances.component';
import { AddingMaintenanceComponent } from './shared/features/maintenance/adding-maintenance/adding-maintenance.component';

export const routes: Routes = [
    {
        path:'',
        component: HomeComponent,
        canActivate:[noAccessAfterLoginGuard],
        data: { myTitle: 'map' }
    },
        

    {
        path:'login',
        component: LoginComponent,
        canActivate:[noAccessAfterLoginGuard],
        data: { myTitle: 'map' }
    },

    {
        path:'dashboard',
        component: DashboardComponent,
        title:'Dashboard',
        data: { myTitle: 'Dashboard' },
        canActivate:[noAccessBeforeLoginGuard],
    },

    {
        path:'customerVehicles',
        component: ViewCustomerCarsComponent,
        title:'Customer Vehicles',
        data: { myTitle: 'List of Customer\'s Vehicles' },
        canActivate:[noAccessBeforeLoginGuard],
    },
    {  
        path: 'user-management',
        component: UserPageComponent,
        title: 'User Management',
        canActivate:[noAccessBeforeLoginGuard],
        data: { myTitle: 'User Management' }
    },
    {  
        path: 'view-all-maintenance',
        component: GetAllMaintenancesComponent,
        title: 'View Maintenance',
        canActivate:[noAccessBeforeLoginGuard],
        data: { myTitle: 'View Maintenance' }
    },
    {  
        path: 'add-new-maintenance',
        component: AddingMaintenanceComponent,
        title: 'Adding New Maintenance',
        canActivate:[noAccessBeforeLoginGuard],
        data: { myTitle: 'Adding New Maintenance' }
    },
    {
        path: '**',
        redirectTo:'',
        canActivate:[noAccessBeforeLoginGuard],
        data: { myTitle: 'map' }
    },
        
];
