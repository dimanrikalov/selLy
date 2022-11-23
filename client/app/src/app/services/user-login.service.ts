import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IUser } from '../interfaces/User';

@Injectable({
  providedIn: 'root',
})
export class UserLoginService {
  constructor(private httpClient: HttpClient) {}

  login(loginInfo: { email: string; password: string }) {
    return this.httpClient.post<{message: string, userId: string}>(environment.loginUrl, loginInfo);
  }
}
