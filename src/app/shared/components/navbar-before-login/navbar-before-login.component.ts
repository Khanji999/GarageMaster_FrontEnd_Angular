import { Component } from '@angular/core';
import { IMAGE_PATHS } from '../../../core/services/imagesPath/images-path.service';
import { RouterLink, RouterModule } from '@angular/router';
import { HoverScaleDirective } from '../../directives/hoverScale/hover-scale.directive';

@Component({
  selector: 'app-navbar-before-login',
  imports: [RouterModule, RouterLink, HoverScaleDirective],
  templateUrl: './navbar-before-login.component.html',
  styleUrl: './navbar-before-login.component.scss'
})
export class NavbarBeforeLoginComponent {
  imagePaths = IMAGE_PATHS;

}
