import { Injectable } from '@angular/core';
import { IListing } from '../interfaces/Listing';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const listingUrl = `${environment.catalogUrl}/636fed5efe2a6fe84a0fe939/details`

@Injectable({
  providedIn: 'root'
})
export class ListingDetailsService {

  constructor(private httpClient: HttpClient) { }

  loadListing () {
    return this.httpClient.get<IListing>(listingUrl);
  }
}
