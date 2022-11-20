import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IListing } from '../interfaces/Listing';
import { environment } from 'src/environments/environment';

const savedListingsUrl = environment.savedListingsUrl;

const userId : string | null = '636fea4d871ff87fe625a7aa';

@Injectable({
  providedIn: 'root'
})
export class SavedListingsService {

  constructor( private httpClient: HttpClient ) {}

  loadSavedListings() {
    
    return this.httpClient.post<IListing[]>(savedListingsUrl, {userId});
  }
}
