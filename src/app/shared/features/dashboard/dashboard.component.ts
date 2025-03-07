import { Component } from '@angular/core';
import { SidebarHamburgerComponent } from "../../components/sidebar-hamburger/sidebar-hamburger.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { TableColumn } from '../../../core/models/table-column.model';
import { GenericTableComponent } from "../../components/generic-table/generic-table.component";
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from "../../components/spinner/spinner.component";
import { ImageService } from '../../../core/services/dealingWithImage/image.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  selectedFile: File | null = null;

  constructor(private imageService: ImageService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  upload() {
    if (this.selectedFile) {
      this.imageService.uploadImage(this.selectedFile).subscribe({
        next: () => alert("Upload successful!"),
        error: (err) => alert("Upload failed: " + err.message)
      });
    }
  }
}
