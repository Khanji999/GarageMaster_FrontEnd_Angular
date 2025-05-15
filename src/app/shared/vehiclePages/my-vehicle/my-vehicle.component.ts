import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CustomerVehicleContro, CustomerVehicleDTO, CustomerVehicleWithDetailsDTO } from '../../../core/services/callAPI/api.service';

@Component({
  selector: 'app-my-vehicle',
  imports: [CommonModule],
  templateUrl: './my-vehicle.component.html',
  styleUrl: './my-vehicle.component.scss'
})
export class MyVehicleComponent implements OnInit {
  customerVehicles : CustomerVehicleWithDetailsDTO[] = []

  constructor(private customerVehicleContr : CustomerVehicleContro ){}

  ngOnInit(): void {
    this.customerVehicleContr.getYourVehicles().subscribe(
      (response) => {
        console.log(response.result)
        this.customerVehicles = response.result!
      }
    )
  }
}
