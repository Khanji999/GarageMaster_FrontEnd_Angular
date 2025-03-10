import { Component, OnInit } from '@angular/core';
import { AddMaintenanceComponent } from "../../templates/add-maintenance/add-maintenance.component";
import { CameraComponent } from "../../components/camera/camera.component";

@Component({
  selector: 'app-dashboard',
  imports: [AddMaintenanceComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
}