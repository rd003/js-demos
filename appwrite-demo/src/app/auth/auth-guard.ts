import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth-service';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  await authService.loadCurrentUser();

  if (authService.currentUser()) {
    return true;
  }
  return router.createUrlTree(['/login']);
};

