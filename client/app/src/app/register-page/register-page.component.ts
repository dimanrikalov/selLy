import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRegisterService } from '../services/user-register.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent implements OnInit {

  errorMessage: string | null = null;

  constructor(
      private userRegisterService: UserRegisterService,
      private router: Router
    ) {}

  ngOnInit(): void {}

  handleFormSubmit(value: {
    email: string;
    name: string;
    ['profile-image']: string;
    password: string;
    ['repeat-password']: string;
    tac: boolean;
  }) : void {

    if (!value.email.includes('@') || value.email.length < 5) {
      this.errorMessage = 'Please enter a valid email!';
      return;
    }

    if (!value.name.match('[A-Z][a-z]+ [A-Z][a-z]+')) {
      this.errorMessage = 'Invalid name! Format: "John Doe"';
      return;
    }

    if (
      !value['profile-image'].startsWith('http://') &&
      !value['profile-image'].startsWith('https://')
    ) {
      this.errorMessage =
        'Image URL must be a valid link! (Starting with "http(s)://")';
      return;
    }

    if (value.password.length < 4) {
      this.errorMessage = 'Minimum password length is 4 characters!';
      return;
    }

    if (value.password !== value['repeat-password']) {
      this.errorMessage = 'Passwords do not match!';
      return;
    }

    if (!value.tac) {
      this.errorMessage = 'You must agree to the terms and conditions!';
      return;
    }

    this.errorMessage = null;

    this.userRegisterService.register({
      email: value.email,
      name: value.name,
      password: value.password,
      repeatPassword: value['repeat-password'],
      profileImage: value['profile-image'],
    }).subscribe({
      next: (response) => {
        console.log(response);
        localStorage.setItem('userId', response.userId);
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log(err);
        if(err.message.startsWith('Http failure response')) {
          this.errorMessage = 'Server error! Please try again later!'
          return;
        }
        this.errorMessage = err.message;
      }
    });
  }
}
