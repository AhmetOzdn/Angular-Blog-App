import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { map, pipe, tap } from 'rxjs';


export const adminGuard: CanActivateFn = (route, state) => {
 const accountService = inject(AccountService);
 const router = inject(Router);

 return accountService.getAuthWithClaim().pipe(
  map(isAdmin => {
    const isAdminUser = isAdmin.rolesAndClaims.some(item => item.name === 'Admin');
    if (!isAdminUser) {
      localStorage.removeItem("token");
      window.location.reload();
      return router.parseUrl('/login'); 
    }
    return true;
  }),
  tap(isAdmin => {
    if (isAdmin == null) {
      localStorage.removeItem("token");
      window.location.reload();
      router.navigate(['/login']);
    }
  })
);
}
