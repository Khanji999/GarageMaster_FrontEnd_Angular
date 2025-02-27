import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Client, API_BASE_URL } from './core/services/callAPI/api.service';
import { InjectTokenService } from './core/interceptors/injectToken/inject-token.service';
import { PorgressBarService } from './core/interceptors/progressBar/porgress-bar.service';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    Client,
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
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
      useValue: 'https://localhost:7077' 
    },
  ]
};
