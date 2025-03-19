import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ProgressBarComponent } from "./shared/components/progress-bar/progress-bar.component";
import { CommonModule } from '@angular/common';
import { LayoutAfterLoginComponent } from "./shared/layout/layout-after-login/layout-after-login.component";
import { LayoutBeforeLoginComponent } from "./shared/layout/layout-before-login/layout-before-login.component";
import { Store } from '@ngrx/store';
import { filter } from 'rxjs';
import { setTitle } from './core/services/titleService/title.actions';


@Component({
  selector: 'app-root',
  imports: [
    ProgressBarComponent,
    CommonModule,
    LayoutAfterLoginComponent,
    LayoutBeforeLoginComponent,
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'garage-master-app';
  beforeLoginRoutes = ['/', '/login', '/aboutUs'];

  constructor(private router: Router , private route: ActivatedRoute, private store: Store) {}

  isBeforeLoginRoute(): boolean {
    return this.beforeLoginRoutes.includes(this.router.url);
  }

  ngOnInit(): void {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      const newTitle = this.route.root.firstChild?.snapshot.data['myTitle'];
      if (newTitle) this.store.dispatch(setTitle({ title: newTitle }));
    });
  }
}

