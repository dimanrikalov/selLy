import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const aboutUrl = environment.aboutUrl;

@Injectable({
  providedIn: 'root',
})
export class AboutDetailsService {
  constructor(private httpClient: HttpClient) {}

  loadStats() {
    return this.httpClient.get<object>(aboutUrl);
  }
}
