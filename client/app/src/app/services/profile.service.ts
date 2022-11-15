import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/User';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const profileUrl = environment.profileUrl;

const userId : null | string = '636fea4d871ff87fe625a7aa'

@Injectable({
  providedIn: 'root',
})

export class ProfileService {
  constructor(private httpClient: HttpClient) {}

  loadProfile() {
    return this.httpClient.post<IUser>(profileUrl, {userId});
  }
}
