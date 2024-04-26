import {
  ApplicationConfig,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  HttpClientModule,
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    importProvidersFrom(HttpClientModule),
    provideHttpClient(withFetch(), withInterceptors([AuthInterceptor])),
    [provideRouter(routes), provideAnimations(), provideHttpClient()], // Bu adımda, ProvidHttpClient() metodunu app.config.ts dosyasına aktarmamız gerekiyor burada onu yaptık bu bizim paginator yapısını kullanmamız için önemli

    {
      // bu kullanım bize gelen time değerini manipülasyon etmemizi sağladı medium değerini istersek değiştirebiliriz
      provide: DATE_PIPE_DEFAULT_OPTIONS,
      useValue: { dateFormat: 'mediumDate' },
    },

    /*'short' - equivalent to 'M/d/yy, h:mm a'. Example value: 6/15/23, 9:03 AM.
      'medium' - equivalent to 'MMM d, y, h:mm:ss a'. Example value: Jun 15, 2023, 9:03:01 AM.
      'long' - equivalent to 'MMMM d, y, h:mm:ss a z'. Example value: June 15, 2023 at 9:03:01 AM GMT+1.
      'full' - equivalent to 'EEEE, MMMM d, y, h:mm:ss a zzzz'. Example value: Monday, June 15, 2015 at 9:03:01 AM GMT+01:00.
      'shortDate' - equivalent to, example value: 'M/d/yy'. Example value: 6/15/23.
      'mediumDate' - equivalent to 'MMM d, y'. Example value: Jun 15, 2023.
      'longDate' - equivalent to'MMMM d, y'. Example value: June 15, 2023.
      'fullDate' - equivalent to 'EEEE, MMMM d, y'. Example value: Saturday, March 11, 2023.
      'shortTime' - equivalent to 'h:mm a'. Example value: 9:03 AM.
      'mediumTime' - equivalent to 'h:mm:ss a'. Example value: 9:03:01 AM.
      'longTime' equivalent to 'h:mm:ss a z'. Example value: 9:03:01 AM GMT+1.
      'fullTime' - equivalent to 'h:mm:ss a zzzz'. Example value 9:03:01 AM GMT+01:00.*/
  ],
};
