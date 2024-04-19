import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth-.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  error: string = '';
  http = inject(HttpClient);
  constructor(private authService: AuthService, private router: Router) {}

  loginFormControl(loginForm: NgForm) {
    if (loginForm.invalid) {
      return;
    } else {
      const email = loginForm.value.email;
      const password = loginForm.value.password;
      this.authService.login(email, password).subscribe({
        next: () => {
          this.router.navigate(['/']);
          this.error = '';
        },
        error: (err) => {
          this.error = err;
          console.log(err);
        },
      });
    }
  }
}
