import { IListing } from '../interfaces/Listing';
import { Component, OnInit } from '@angular/core';;
import { SavedListingsService } from '../services/saved-listings.service';

@Component({
  selector: 'app-saved-listings-page',
  templateUrl: './saved-listings.component.html',
  styleUrls: ['./saved-listings.component.css'],
})
export class SavedListingsPageComponent implements OnInit {
  
  savedListings: IListing[] | null = null;
  
  constructor(private savedListingsApi: SavedListingsService) {}

  ngOnInit(): void {
    this.savedListingsApi.loadSavedListings().subscribe({
      next: (value) => {
        console.log(value);
        this.savedListings = value;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
