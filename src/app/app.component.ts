import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth-.service';
import { MatDialogModule } from '@angular/material/dialog';
import { AccountService } from './services/account.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    RouterOutlet,
    NavbarComponent,
    RouterModule,
    RouterLink,
    HttpClientModule,
    MatDialogModule,
    CommonModule,
    
  ],
})
export class AppComponent implements OnInit {
  isAuthor: boolean = false;
  isAuthenticated: boolean = false;
  title = 'blogws';
  constructor(
    private authService: AuthService,
    private accountService: AccountService
  ) {}
  ngOnInit(): void {
    //?Auto login'i sayfa yüklenince çağırır
    this.authService.autoLogin(); 

    //?Login Sorgusu
    this.authService.tokenModel.subscribe((response) => {
      this.isAuthenticated = !!response;
    });

    //?Author sorgusu
    if (this.isAuthenticated === true) {
      this.accountService.getAuthWithClaim().subscribe((data) => {
        data.rolesAndClaims.forEach((item) => {
          if (item.name === 'Author') {
            this.isAuthor = !!item;
          } else {
            this.isAuthor = false;
          }
        });
      });
    } else {
      this.isAuthenticated = false;
    }
  }
}
