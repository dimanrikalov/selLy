import { Component, OnInit } from '@angular/core';
import { UserLoginService } from '../services/user-login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;

  constructor(private userLoginService: UserLoginService) {}

  ngOnInit(): void {}

  handleFormSubmit(value: {
    email: string;
    password: string;
    ['remember-me']: boolean;
  }): void {
    this.userLoginService.login({
      email: value.email,
      password: value.password,
    }).subscribe({
      next: (response) => {
        console.log(response.message);
        
        localStorage.setItem('userId', response.userId);
      },
      error: (err) => {
        console.error(err)
      }
    });
  }
}
