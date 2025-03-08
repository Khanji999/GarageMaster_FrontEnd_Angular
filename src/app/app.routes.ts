import { Routes } from '@angular/router';
import { HomeComponent } from './shared/features/home/home.component';
import { LoginComponent } from './shared/features/login/login.component';
import { AboutUsComponent } from './shared/features/about-us/about-us.component';
import { noAccessAfterLoginGuard } from './core/guards/no-access-after-login.guard';
import { DashboardComponent } from './shared/features/dashboard/dashboard.component';
import { noAccessBeforeLoginGuard } from './core/guards/no-access-before-login.guard';
import { UserPageComponent } from './shared/features/user-page/user-page.component';

export const routes: Routes = [
    {path:'',
        component: HomeComponent,
        canActivate:[noAccessAfterLoginGuard]},

    {path:'login',
        component: LoginComponent,
        canActivate:[noAccessAfterLoginGuard]},

    {path:'dashboard',
        component: DashboardComponent,
        title:'Dashboard',
         },

    {  
        path: 'user-management',
        component: UserPageComponent,
        data: { title: 'User Management' },
        title: 'User Management',
        canActivate:[noAccessBeforeLoginGuard]
    },

    {path: '**',
        redirectTo:'',
        canActivate:[noAccessBeforeLoginGuard]},
        
];
