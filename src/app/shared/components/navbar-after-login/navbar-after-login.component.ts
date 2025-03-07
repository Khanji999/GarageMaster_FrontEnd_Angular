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
  headerTitle: string | undefined;

  constructor(private activatedRoute: ActivatedRoute, private router : Router) {}

  ngOnInit() {
    console.log(this.activatedRoute.title)
    console.log(this.activatedRoute.data)
    console.log(this.activatedRoute.snapshot.paramMap.get("title"))
    console.log(this.router.url)

  }
}
