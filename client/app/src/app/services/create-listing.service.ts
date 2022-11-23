import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const createListingUrl = environment.createListingUrl;

@Injectable({
  providedIn: 'root',
})
export class CreateListingService {
  constructor(private httpClient: HttpClient) {}

  createListing(listing: {
    item: string;
    brand: string;
    imageUrl: string;
    description: string;
    city: string;
    country: string;
    price: string;
  }) {
    return this.httpClient.post(createListingUrl, {
      ...listing,
      price: Number(listing.price),
      userId: localStorage.getItem('userId')
    });
  }
}
