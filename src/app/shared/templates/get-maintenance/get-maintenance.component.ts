import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CustomerInfoComponent } from '../../components/customer-info/customer-info.component';
import { SaudiArabiaPlateComponent } from '../../components/plates/saudi-arabia-plate/saudi-arabia-plate.component';

@Component({
  selector: 'app-get-maintenance',
  imports: [CommonModule, SaudiArabiaPlateComponent, CustomerInfoComponent],
  templateUrl: './get-maintenance.component.html',
  styleUrl: './get-maintenance.component.scss'
})
export class GetMaintenanceComponent {

}
