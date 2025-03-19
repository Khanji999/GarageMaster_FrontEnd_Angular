import { Component } from '@angular/core';
import { NavbarBeforeLoginComponent } from "../../components/navbar-before-login/navbar-before-login.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-before-login',
  imports: [NavbarBeforeLoginComponent, RouterOutlet],
  templateUrl: './layout-before-login.component.html',
  styleUrl: './layout-before-login.component.scss'
})
export class LayoutBeforeLoginComponent {
}
