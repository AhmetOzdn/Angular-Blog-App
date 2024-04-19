import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth-.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  isAuthenticated: boolean = false;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.tokenModel.subscribe((response) => {
      this.isAuthenticated = !!response;
    });
  }

  logOut() {
    this.authService.logOut();
  }


}
