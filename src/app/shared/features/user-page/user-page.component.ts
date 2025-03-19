import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-page',
  imports: [CommonModule],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss'
})
export class UserPageComponent implements OnInit{
  clue =""
  constructor(private route: ActivatedRoute){}
  
  ngOnInit(): void {
    this.route?.data.subscribe(data => {
      this.clue = data['myTitle'];
    });
  }
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
