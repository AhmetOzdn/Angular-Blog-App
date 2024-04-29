import { CanActivateFn, Router} from '@angular/router';
import { map, tap } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth-.service';

export const visitorGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService)
  const router = inject(Router)

  return authService.tokenModel.pipe(
    map(tokenModel =>{
         return !!tokenModel 
    }),
    tap(isVisitor =>{
        if(!isVisitor){
            router.navigate(["/register"]);
            localStorage.removeItem("token");
        }
    })
);



}

