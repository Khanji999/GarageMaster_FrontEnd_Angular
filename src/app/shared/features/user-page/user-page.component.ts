import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GetMaintenanceComponent } from "../../templates/get-maintenance/get-maintenance.component";

@Component({
  selector: 'app-user-page',
  imports: [CommonModule, GetMaintenanceComponent],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss'
})
export class UserPageComponent {
  // columns: TableColumn[] = [
  //   { key: 'id', header: 'ID' },
  //   { key: 'userName', header: 'Username' },
  //   { key: 'password', header: 'Password' },
  //   { key: 'isActive', header: 'Is Active' }
  // ];
  // data: any[] = [];
  // isLoading: boolean = true;
  
  // constructor(private userService: UserService) {}

  // ngOnInit() {
  //   this.userService.getUsers().subscribe(
  //     (response: any[]) => {
  //       this.data = response; // Assign the response to the data array
  //       this.isLoading = false; // Data has been loaded
  //     }
  //   );
  // }
}
