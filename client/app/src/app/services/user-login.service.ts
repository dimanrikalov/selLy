import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const loginUrl = environment.loginUrl;

@Injectable({
  providedIn: 'root',
})
export class UserLoginService {
  constructor(private httpClient: HttpClient) {}

  login(loginInfo: { email: string; password: string }) {
    return this.httpClient.post<{ message: string; userId: string }>(
      loginUrl,
      loginInfo
    );
  }
}
