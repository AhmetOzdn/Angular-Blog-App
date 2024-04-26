import { HttpRequest, HttpHandlerFn, HttpInterceptorFn } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, take, filter } from 'rxjs/operators';
import { AuthService } from '../services/auth-.service';
import { inject } from '@angular/core';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authService: AuthService = inject(AuthService);
  let isRefreshing = false;
  let refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  
  return authService.tokenModel.pipe(
    take(1),
    switchMap(tokenModel => {
      if (tokenModel && tokenModel.token && new Date(tokenModel.expiration)> new Date()){
        req = addToken(req, tokenModel.token);
      }
      return next(req).pipe(
        catchError(error => {
          if (error.status === 401) {   
           
            return handleUnauthorizedError(req, next, authService, refreshTokenSubject, isRefreshing);
          } else {
            return throwError(error);

          }
        })
      );
    })
  );
}

function addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });
}

function handleUnauthorizedError(req: HttpRequest<any>, next: HttpHandlerFn, authService: AuthService, refreshTokenSubject: BehaviorSubject<any>, isRefreshing: boolean): Observable<any> {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject.next(null);

    return authService.refreshToken().pipe(
      switchMap(newTokenModel => {
        isRefreshing = false;
        refreshTokenSubject.next(newTokenModel.token);
        req = addToken(req, newTokenModel.token);
        return next(req);
      }),
      catchError(error => {
        isRefreshing = false;
        authService.logOut();
        return throwError(error);
      })
    );
  } else {
    return refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap(() => {
        return next(addToken(req, refreshTokenSubject.value));
      })
    );
  }
}
