import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth-.service';
import { CommonModule } from '@angular/common';
import { AdminService } from '../services/admin.service';
import { response } from 'express';
import { AccountService } from '../services/account.service';
import { getFromAuthWithClaimModel } from '../models/getFromAuthWithClaimModel';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  isAuthenticated: boolean = false;
  getFromAuthWithClaim: getFromAuthWithClaimModel[] = [];
  isAdmin: boolean = true;

  constructor(
    private authService: AuthService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.authService.tokenModel.subscribe((response) => {
      this.isAuthenticated = !!response;
    });

    // Admin sorgusu
    if (this.isAuthenticated === true) {
      this.accountService.getAuthWithClaim().subscribe((data) => {
        if (
          (this.isAdmin = data.rolesAndClaims.some(
            (item) => item.name === 'Admin'
          ))
        ) {
          this.isAdmin === true;
        } else {
          this.isAdmin == false;
        }
      });
    }
  }

  logOut() {
    this.authService.logOut();
  }
}
