// status-toast.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';  // using ngx-toastr

@Injectable()
export class StatusToastInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap({
        next: (event) => {
          
          if (event instanceof HttpResponse) {
          
            const message = event.headers.get('X-Api-Message') || 'Operation completed';
            const status = event.status;
            if (status === 204) {
              this.toastr.warning(message);
            } 
          }
        },
  
        error: (error: HttpErrorResponse) => {
          const serverMessage = error.headers?.get('X-Api-Message') || error.error?.message || 'An unexpected error occurred';
          const status = error.status;
          if (status === 401) {
            this.toastr.error(serverMessage);
          } 
          else if (status === 404) {
            this.toastr.error(serverMessage);
          } 
          else if (status === 500) {
            this.toastr.error(serverMessage);
          } 
          else {
            this.toastr.error(serverMessage);
          }
        }
      })
    );
  }
  
}
