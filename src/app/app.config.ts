import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';
import {  API_BASE_URL } from './core/services/callAPI/api.service';
import { InjectTokenService } from './core/interceptors/injectToken/inject-token.service';
import { PorgressBarService } from './core/interceptors/progressBar/porgress-bar.service';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    // importProvidersFrom(WebcamModule), here will be global access every where 
    // , but sience it jsut has a ui component use it inside compoonent 
    // if there are services , you need to add it here .
    provideRouter(routes, withComponentInputBinding()),
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideHttpClient(withInterceptorsFromDi()), 
    provideAnimations(),
    {
      provide:HTTP_INTERCEPTORS,
      useClass:InjectTokenService,
      multi:true
  },
  {   
    provide: HTTP_INTERCEPTORS,
    useClass: PorgressBarService,
    multi: true
  },
    { provide: API_BASE_URL,
      useValue: 'http://localhost:7777', 
    },       
    // { provide: API_BASE_URL,
    //   useValue: 'http://192.168.1.2:5000', 
    // },   
  ],

};
