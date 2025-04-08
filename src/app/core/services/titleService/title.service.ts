import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, mergeMap } from 'rxjs/operators';
import { setTitle } from './title.actions';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private store: Store<{ title: { title: string } }>) {}

  startListeningForTitleChanges() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      filter(route => route.outlet === 'primary'),
      mergeMap(route => route.data)
    ).subscribe(data => {
      if (data['myTitle']) {
        this.store.dispatch(setTitle({ title: data['myTitle'] }));
      }
    });
  }

  getTitle() {
    return this.store.select(state => state.title.title);
  }
}
