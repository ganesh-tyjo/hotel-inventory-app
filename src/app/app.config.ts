import {
  APP_INITIALIZER,
  ApplicationConfig,
  ErrorHandler,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { requestInterceptor } from './request.interceptor';
import { InitService } from './init.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { GlobalErrorHandler } from './errorhandler.service';

function initFactory(initService: InitService) {
  return () => initService.init();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([requestInterceptor])),
    {
      provide: APP_INITIALIZER,
      useFactory: initFactory,
      deps: [InitService],
      multi: true,
    },
    provideAnimationsAsync(),
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
  ],
};
