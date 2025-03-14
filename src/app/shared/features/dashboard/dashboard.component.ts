import { Component, OnInit } from '@angular/core';
import { CameraComponent } from "../../components/camera/camera.component";
import { AddingMaintenanceComponent } from "../maintenance/adding-maintenance/adding-maintenance.component";

@Component({
  selector: 'app-dashboard',
  imports: [AddingMaintenanceComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
}