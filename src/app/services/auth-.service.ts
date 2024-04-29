import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { JwtTokenModel } from '../models/jwtTokenModel';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common'; // platform-browser modülü ekledik
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cookieService: CookieService,
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
    this.cookieService.set('Token',JSON.stringify(jwtToken));
    // localStorage.setItem('token', JSON.stringify(jwtToken)); // burada localStorage'ye token'ı atıyoruz
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
    // burada kullanıcı girşi yapmamış ise  Token = "" oluyor ve parse hgatası veriyor buna bak 
   
    const cookieToken =  this.cookieService.get('Token');
    if (cookieToken === null) {
      return
    }                           
    if(cookieToken === ""){
      return 
    }else{                            
      const jwtToken = JSON.parse(cookieToken);
      const loadedJwtToken = new JwtTokenModel(
        jwtToken.token,
        new Date(jwtToken.expiration)
      );
      this.tokenModel.next(loadedJwtToken);
    }                   
  }

  logOut() {
    this.tokenModel.next(null);
    localStorage.removeItem('token');
    this.cookieService.delete("Token");
    this.router.navigate(['/']);
    this.reloadPage()
  }

    // Sayfanın yenilenmesi için örnek bir fonksiyon
    reloadPage() {
      setTimeout(() => {
        window.location.reload();
      }, 500); 
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
