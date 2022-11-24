import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const commentUrl = `${environment.catalogUrl}/`;

@Injectable({
  providedIn: 'root',
})
export class CommentApiService {
  constructor(private httpClient: HttpClient) {}

  create(content: string, userId: string, listingId: string ) {
    return this.httpClient.post(`${commentUrl}/${listingId}/comments/create`, {content, userId, listingId});
  }
  
  edit() {
    
  }

  delete() {

  }
}
