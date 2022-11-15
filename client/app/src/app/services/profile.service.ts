import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/User';

const userId : null | string = localStorage.getItem('user');

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private httpClient: HttpClient) {}

  loadProfile() {
    return this.httpClient.get<IUser>(userId!);
  }
}
