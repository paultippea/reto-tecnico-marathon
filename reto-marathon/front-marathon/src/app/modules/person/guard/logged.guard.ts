import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from '../../auth/service/login.service';

export const loggedGuard: CanActivateFn = () => {
  let router = inject(Router);
  let login = inject(LoginService);
  return login.isLoggedIn() || router.navigate(['/auth']);
};
