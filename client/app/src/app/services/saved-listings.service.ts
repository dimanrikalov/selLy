import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IListing } from '../interfaces/Listing';
import { environment } from 'src/environments/environment';

const savedListingsUrl = environment.savedListingsUrl;

const userId : string | null = localStorage.getItem('userId');

@Injectable({
  providedIn: 'root'
})
export class SavedListingsService {

  constructor( private httpClient: HttpClient ) {}

  loadSavedListings() {
    return this.httpClient.post<IListing[]>(savedListingsUrl, {userId});
  }
}
