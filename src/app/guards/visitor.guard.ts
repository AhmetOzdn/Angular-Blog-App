import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth-.service';

export const visitorGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)

  return authService.tokenModel.pipe(
    map(tokenModel =>{
         return !!tokenModel 
    }),
    tap(isAdmin =>{
        if(!isAdmin){
            router.navigate(["/register"]);
            localStorage.removeItem("token");
        }
    })
);
}

