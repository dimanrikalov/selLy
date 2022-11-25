import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/User';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const profileUrl = environment.profileUrl;

@Injectable({
  providedIn: 'root',
})

export class ProfileService {
  constructor(private httpClient: HttpClient) {}

  loadProfile(userId: string | null) {
    return this.httpClient.post<IUser>(profileUrl, {userId});
  }
}
