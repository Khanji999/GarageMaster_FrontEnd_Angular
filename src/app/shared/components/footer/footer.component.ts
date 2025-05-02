import { Component, OnInit } from '@angular/core';
import { ImageContro, TenantContro } from '../../../core/services/callAPI/api.service';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {
  tenant: string | undefined ;
  imageUrl :any;

 constructor(
  private imageContr : ImageContro,
  private tenantContro : TenantContro ) {
  }
  
  ngOnInit() : void {
    this.tenantContro.getCurrentTenant().subscribe(
      (response) => {
        this.tenant = response.result?.name; 
        this.downloadImage(this.tenant);
      } 
    );
  }

  downloadImage(name: any): void {
    this.imageContr.download(name+".jpg").subscribe(
      (response) => {
          const objectURL = URL.createObjectURL(response.data);
          this.imageUrl = objectURL;
      },
      error => {
        console.error('Download failed:', error);
      }
    );
  }
}
