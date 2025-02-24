import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { LoaderService } from '../../services/loader/loader.service';

@Injectable({
  providedIn: 'root'
})
export class PorgressBarService implements HttpInterceptor {
  constructor(private loaderService :LoaderService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.isLoading.next(true);
    return next.handle(req).pipe(
      finalize( 
        ()=>setTimeout(() => this.loaderService.hide(), 2000)
      )
    )
  }
}

