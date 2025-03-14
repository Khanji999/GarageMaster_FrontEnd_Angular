import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-navbar-after-login',
  imports: [CommonModule],
  templateUrl: './navbar-after-login.component.html',
  styleUrl: './navbar-after-login.component.scss'
})
export class NavbarAfterLoginComponent implements OnInit {
  clue?: string;
  constructor(private route: ActivatedRoute) { }
  // the value is not changing because it works only 1 time
  ngOnInit(): void {
    this.route?.firstChild?.data.subscribe(data => {
      this.clue = data['myTitle'];
    });
  }
}
