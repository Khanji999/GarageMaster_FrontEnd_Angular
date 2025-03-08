import { Component } from '@angular/core';
import { SidebarHamburgerComponent } from "../../components/sidebar-hamburger/sidebar-hamburger.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { TableColumn } from '../../../core/models/table-column.model';
import { GenericTableComponent } from "../../components/generic-table/generic-table.component";
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from "../../components/spinner/spinner.component";
import { ImageService } from '../../../core/services/dealingWithImage/image.service';
import { WebcamModule } from 'ngx-webcam';

@Component({
  selector: 'app-dashboard',
  imports: [WebcamModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  status : any = null;
  steam :any | undefined

  checkPermission(){
    navigator.mediaDevices.getUserMedia(
      {video : {width:500 , height :500} }
    ).then( (res) => {
      this.steam = res;
      this.status = "Camera is Running now"

    }
    ).catch(err =>{
      console.log(err);
      if(err?.message === "Permission denied"){
        this.status = "Permission denied , Please Enable Camera";
        console.log(this.status)
      }
    })
  }
  
}
