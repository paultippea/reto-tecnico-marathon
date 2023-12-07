import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './modules/auth/interceptor/token.interceptor';
import { errorInterceptor } from './modules/auth/interceptor/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(
      withInterceptors(
        [
          tokenInterceptor,
          errorInterceptor
        ]
      )
    )
  ]
};
