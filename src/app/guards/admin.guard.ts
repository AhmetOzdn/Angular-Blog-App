import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-.service';
import { map, tap } from 'rxjs';
import { AdminService } from '../services/admin.service';

export const adminGuard: CanActivateFn = (route, state) => {
  // const adminService = inject(AdminService);
  // const authService = inject(AuthService);
  // const router = inject(Router);

  // return authService.tokenModel.pipe(
  //   map((tokenModel) => {
  //     return (
  //       /!!tokenModel &&
  //       !!Admin Sorgusu Burada Yapılacak
  //       // adminService.isAdmin().pipe(
  //       //   map((isAdmin) => {
  //       //     if (!isAdmin) {
  //       //       router.navigate(['/register']);
  //       //       localStorage.removeItem('token');
  //       //       return false
  //       //     }
  //       //     return true;
  //       //   })
  //       // )
  //     );
  //   }),
  //   tap((isAdmin) => {
  //     if (!isAdmin) {
  //       router.navigate(['/register']);
  //       localStorage.removeItem('token');
  //       return false
  //     }
  //     return true;
  //   })
  // );
  return true;
};
