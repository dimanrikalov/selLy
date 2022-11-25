import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/User';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const profileUrl = environment.profileUrl;

const userId : null | string = localStorage.getItem('userId');

@Injectable({
  providedIn: 'root',
})

export class ProfileService {
  constructor(private httpClient: HttpClient) {}

  loadProfile() {
    console.log(userId);
    return this.httpClient.post<IUser>(profileUrl, {userId});
  }
}
