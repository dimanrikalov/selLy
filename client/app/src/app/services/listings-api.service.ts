import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import { IListing } from '../interfaces/Listing';

const catalogUrl = environment.catalogUrl;

@Injectable({
  providedIn: 'root',
})

export class ListingsApiService {
  constructor( private httpClient: HttpClient ) {}

  loadListings() {
    return this.httpClient.get<IListing[]>(catalogUrl);
  }
  
}
