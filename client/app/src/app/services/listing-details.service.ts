import { Injectable } from '@angular/core';
import { IListing } from '../interfaces/Listing';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const listingUrl = `${environment.catalogUrl}`

@Injectable({
  providedIn: 'root'
})
export class ListingDetailsService {

  constructor(private httpClient: HttpClient) { }

  loadListing (id: string | null) {
    return this.httpClient.get<IListing>(`${listingUrl}/${id}/details`);
  }
}
