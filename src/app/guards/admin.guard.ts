import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { map, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

export const adminGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const router = inject(Router);
  const cookieService = inject(CookieService);
  return accountService.getAuthWithClaim().pipe(
    map((isAdmin) => {
      const isAdminUser = isAdmin.rolesAndClaims.some(
        (item) => item.name === 'Admin'
      );
      if (!isAdminUser) {
        localStorage.removeItem('token');
        cookieService.delete('Token');
        router.navigate(['/login']);
        window.location.reload();
      }
      return true;
    }),
    tap((isAdmin) => {
      if (isAdmin == null) {
        localStorage.removeItem('token');
        cookieService.delete('Token');
        router.navigate(['/login']);
        window.location.reload();
      }
    })
  );
};
