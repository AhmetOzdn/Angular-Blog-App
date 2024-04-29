import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink,Router } from '@angular/router';
import { AuthService } from '../services/auth-.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule, HttpClientModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  error: string = '';
  http = inject(HttpClient);
  constructor(private authService: AuthService,private router: Router) {}

  registerFormControl(registerForm: NgForm) {
    if (registerForm.invalid) {
      return;
    } else {
      const email = registerForm.value.email;
      const password = registerForm.value.password;
      const firstName = registerForm.value.firstName;
      const lastName = registerForm.value.lastName;
      this.authService
        .register(email, password, firstName, lastName)
        .subscribe({
          next: (result) => {
            // console.log(result);
            this.router.navigate(['/']);
          },

          error: (err) => {
            this.error = err;
            // console.log('Register Hata Mesajı',err);
          },
        });
    }
  }
}
