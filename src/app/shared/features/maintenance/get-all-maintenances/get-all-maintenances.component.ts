import { Component } from '@angular/core';
import { SaudiArabiaPlateComponent } from '../../../components/plates/saudi-arabia-plate/saudi-arabia-plate.component';
import { CommonModule } from '@angular/common';
import { CustomerInfoComponent } from '../../../components/customer-info/customer-info.component';

@Component({
  selector: 'app-get-all-maintenances',
  imports: [CommonModule, SaudiArabiaPlateComponent, CustomerInfoComponent],
  templateUrl: './get-all-maintenances.component.html',
  styleUrl: './get-all-maintenances.component.scss'
})
export class GetAllMaintenancesComponent {

}
