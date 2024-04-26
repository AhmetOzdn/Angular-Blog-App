import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { map, tap } from 'rxjs';

export const authorGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const router = inject(Router);
 
  return accountService.getAuthWithClaim().pipe(
   map(isAuthor => {
     const isAdminUser = isAuthor.rolesAndClaims.some(item => item.name === 'Author');
     if (!isAdminUser) {
       localStorage.removeItem("token");
       return router.parseUrl('/login'); 
     }
     return true;
   }),
   tap(isAuthor => {
     if (isAuthor == null) {
       localStorage.removeItem("token");
       router.navigate(['/login']); 
     }
   })
 );
};
