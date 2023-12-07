import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { LoginService } from '../service/login.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(LoginService);
  return next(req).pipe(
    catchError((error) => {
      if ([401].includes(error.status)) {
        authService.signOut();
      }
      return throwError(() => error);
    })
  );
};
