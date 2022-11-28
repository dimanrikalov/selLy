import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const createListingUrl = environment.createListingUrl;
const catalogUrl = environment.catalogUrl;

@Injectable({
  providedIn: 'root',
})
export class ListingOperationsService {
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
      userId: localStorage.getItem('userId'),
    });
  }

  editListing(
    listing: {
      item: string;
      brand: string;
      imageUrl: string;
      description: string;
      city: string;
      country: string;
      price: string;
    },
    listingId: string,
    loggedUserId: string
  ) {
    return this.httpClient.post(`${catalogUrl}/${listingId}/edit`, {
      ...listing,
      price: Number(listing.price),
      userId: loggedUserId,
    });
  }

  saveListing(listingId: string, loggedUserId: string) {
    return this.httpClient.post(`${catalogUrl}/${listingId}/save`, {
      listingId,
      userId: loggedUserId,
    });
  }

  deleteListing(listingId: string, loggedUserId: string | null) {
    return this.httpClient.post(`${catalogUrl}/${listingId}/delete`, {
      listingId,
      userId: loggedUserId,
    });
  }
}
