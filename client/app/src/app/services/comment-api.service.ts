import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const commentUrl = `${environment.catalogUrl}`;

@Injectable({
  providedIn: 'root',
})
export class CommentApiService {
  constructor(private httpClient: HttpClient) {}

  get(listingId: string | null, userId: string | null, commentId: string) {
    return this.httpClient.post(
      `${commentUrl}/${listingId}/comments/${commentId}`,
      { listingId, userId, commentId }
    );
  }

  create(content: string, userId: string, listingId: string) {
    return this.httpClient.post(`${commentUrl}/${listingId}/comments/create`, {
      content,
      userId,
      listingId,
    });
  }

  edit(
    newContent: string,
    userId: string,
    listingId: string,
    commentId: string
  ) {
    return this.httpClient.post(
      `${commentUrl}/${listingId}/comments/${commentId}/edit`,
      { newContent, userId, listingId, commentId }
    );
  }

  delete(listingId: string, commentId: string, userId: string) {
    return this.httpClient.post(
      `${commentUrl}/${listingId}/comments/${commentId}/delete`,
      { userId, listingId }
    );
  }
}
