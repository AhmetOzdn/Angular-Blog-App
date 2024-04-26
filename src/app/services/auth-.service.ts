import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { JwtTokenModel } from '../models/jwtTokenModel';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common'; // platform-browser modülü ekledik
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  registerUrl = 'https://localhost:7068/api/Auth/Register';
  loginUrl = 'https://localhost:7068/api/Auth/Login';
  refreshTokenUrl = 'https://localhost:7068/api/Auth/RefreshToken';
  tokenModel = new BehaviorSubject<JwtTokenModel | null>(null);
  credentials = { withCredentials: true };

  register(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) {
    const registerObject = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    };
    return this.http
      .post<JwtTokenModel>(this.registerUrl, registerObject, this.credentials)
      .pipe(
        tap((response) => {
          this.handleJWTToken(response.token, response.expiration);
          alert('Kayıt İşlemi Başarılı ');
          
        }),
        catchError(this.handleError)
      );
  }

  login(email: string, password: string) {
    const loginObject = {
      email: email,
      password: password,
    };
    // console.log(loginObject); // login işleminde giriş yapılan inputları konsola yazdırır
   
    return this.http
      .post<JwtTokenModel>(this.loginUrl, loginObject, this.credentials)
      .pipe(
        tap((response) => {
          this.handleJWTToken(response.token, response.expiration);
          alert('Giriş İşlemi Başarılı');
          
        }),
        catchError(this.handleError)
      );
  }

  private handleJWTToken(token: string, expiration: Date) {
    const jwtToken = new JwtTokenModel(token, expiration);
    this.tokenModel.next(jwtToken); // burada jwtToken'ı behoviorSubject'e atıyoruz
    localStorage.setItem('token', JSON.stringify(jwtToken)); // burada localStorage'ye token'ı atıyoruz
  }

  private handleError(err: HttpErrorResponse) {
    let message = err.error.detail; // burada sadece error içindeki hata yazısını message içerisine atıyoruz "detail"
    // console.log(err);  tür error hatasını gösterir
    //console.log(err.error.detai);  sadece error içindeki hata yazısını gösterir
    
    return throwError(() => message);
  }

  autoLogin() {
    if (!isPlatformBrowser(this.platformId)) {
      // Tarayıcıda değilse, işlem yapma
      return;
    }
    const token = localStorage.getItem('token');
    if (token === null) {
      return;
    }
    const jwtToken = JSON.parse(token);
    const loadedJwtToken = new JwtTokenModel(
      jwtToken.token,
      new Date(jwtToken.expiration)
    );
    this.tokenModel.next(loadedJwtToken);
  }

  logOut() {
    this.tokenModel.next(null);
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  setToken(setToken: string) {
    return localStorage.setItem('token', setToken);
  }

  removeToken() {
    return localStorage.removeItem('token');
  }

  refreshToken(): Observable<JwtTokenModel> {
    return this.http
      .get<JwtTokenModel>(this.refreshTokenUrl, this.credentials)
      .pipe(
        tap((response) => {
          this.handleJWTToken(response.token, response.expiration);
          // console.log(response);
        }),
        catchError(this.handleError)
      );
  }
}
