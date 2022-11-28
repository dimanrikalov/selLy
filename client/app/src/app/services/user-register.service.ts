import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const registerUrl = environment.registerUrl;

@Injectable({
  providedIn: 'root',
})
export class UserRegisterService {
  constructor(private httpClient: HttpClient) {}

  register(registerInfo: {
    email: string;
    name: string;
    password: string;
    repeatPassword: string;
    profileImage: string;
  }) {
    return this.httpClient.post<{ message: string; userId: string }>(
      registerUrl,
      registerInfo
    );
  }
}
