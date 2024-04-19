import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth-.service';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, NavbarComponent,RouterModule,RouterLink,HttpClientModule,MatDialogModule],
})
export class AppComponent implements OnInit {
  title = 'blogws';
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.authService.autoLogin(); //auto login'i sayfa yüklenince çağırır
  }
}
