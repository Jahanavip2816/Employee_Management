import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth';

export const AuthGuard: CanActivateFn = (route) => {

  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  const expectedRole = route.data?.['role'];
  const userRole = auth.getRole();

  if (expectedRole && expectedRole !== userRole) {
    alert('Access Denied!');
    router.navigate(['/dashboard']);
    return false;
  }

  return true;
};
