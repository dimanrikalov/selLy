import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserLoginService } from '../services/user-login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  errorMessage: string | null = null;

  constructor(
    private userLoginService: UserLoginService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  handleFormSubmit(value: {
    email: string;
    password: string;
    ['remember-me']: boolean;
  }): void {
    if (!value.email || !value.email.includes('@') || !value.password) {
      this.errorMessage = 'Invalid email or password!';
      return;
    }

    this.userLoginService
      .login({
        email: value.email,
        password: value.password,
      })
      .subscribe({
        next: (response) => {
          localStorage.setItem('userId', response.userId);
          window.dispatchEvent(new Event('storage'));
          this.router.navigate(['/']);
        },
        error: (err) => {
          if (
            err.message.startsWith('Http failure response') &&
            !err.error.message
          ) {
            this.errorMessage = 'Server error! Please try again later!';
            return;
          }
          this.errorMessage = err.error.message;
        },
      });
  }
}
