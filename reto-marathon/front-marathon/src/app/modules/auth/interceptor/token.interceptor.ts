import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoginService } from '../service/login.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const login = inject(LoginService);
  if (login.isLoggedIn()) {
    const token = `${localStorage.getItem('type-token')} ${localStorage.getItem('access-token')}`
    const authReq = req.clone({
      headers: req.headers.set('Authorization', token)
    });
    return next(authReq);
  }
  return next(req);
};