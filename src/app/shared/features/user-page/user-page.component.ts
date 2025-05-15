import { Component, OnInit } from '@angular/core';
import { GenericTableComponent } from "../../components/generic-table/generic-table.component";
import { UserContro, UserWithRoleDTO } from '../../../core/services/callAPI/api.service';
import { map, Observable } from 'rxjs';
import { PermissionService } from '../../../core/services/permissionService/permission.service';
import { AddUserFormComponent } from "../../forms/add-user-form/add-user-form.component";

@Component({
  selector: 'app-user-page',
  imports: [GenericTableComponent, AddUserFormComponent],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss'
})
export class UserPageComponent  implements OnInit{
// perm
  viewTableUsers = false;
  addNewUser = false;
//

  users?: UserWithRoleDTO[] | any;
  selectedRowForDelete?: UserWithRoleDTO;
  columns = [
    { header: 'Username', key: 'processedData' },     
    { header: 'Role', key: 'role.name' },     
    // { header: 'Is Active', key: 'user.isActive' },     
    ]
  
  constructor(private userContro : UserContro ,
              private helloPermission : PermissionService
  ){}

  ngOnInit(): void {
    this.viewTableUsers = this.helloPermission.hasPermission("UserContro","getUsersWithRole")
    this.getUsers();
  }

  getUsers():void{
    this.userContro.getUsersWithRole().subscribe(
      (response) => {
      this.users = response.result?.map((user: any) => ({
        ...user, 
        processedData: `${user.user.userName}@${user.user.subDomain}`
      }));
      }
    );
  }

  openUserForm() {
    this.addNewUser = true;
  }
  deleteUser($event: UserWithRoleDTO) {
    this.selectedRowForDelete = $event;
    console.log(3)
    this.userContro.deleteUserWithData(this.selectedRowForDelete).subscribe(
      (response) => {
        this.getUsers();
      })
  }


}
