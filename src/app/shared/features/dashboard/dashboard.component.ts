import { Component } from '@angular/core';
import { SidebarHamburgerComponent } from "../../components/sidebar-hamburger/sidebar-hamburger.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { TableColumn } from '../../../core/models/table-column.model';
import { UserServiceService } from '../../../core/services/userService/user-service.service';
import { GenericTableComponent } from "../../components/generic-table/generic-table.component";
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from "../../components/spinner/spinner.component";

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
}
