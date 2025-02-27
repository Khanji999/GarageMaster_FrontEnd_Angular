import { Component } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar'; 
import { LoaderService } from '../../../core/services/loader/loader.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-progress-bar',
  imports: [MatProgressBarModule , CommonModule],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss'
})
export class ProgressBarComponent {

  constructor( public loaderService:LoaderService){}
}
