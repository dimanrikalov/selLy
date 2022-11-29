import { IListing } from '../interfaces/Listing';
import { Component, OnInit } from '@angular/core';
import { SavedListingsService } from '../services/saved-listings.service';

@Component({
  selector: 'app-saved-listings-page',
  templateUrl: './saved-listings.component.html',
  styleUrls: ['./saved-listings.component.css'],
})
export class SavedListingsPageComponent implements OnInit {
  savedListings: IListing[] | null = null;
  filteredListings: IListing[] | null = null;
  errorMessage: string | null = 'Fetching...';
  userId: string | null = null;
  constructor(private savedListingsApi: SavedListingsService) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    if (this.userId !== null) {
      this.savedListingsApi.loadSavedListings(this.userId).subscribe({
        next: (value) => {
          this.savedListings = value;
          this.filteredListings = this.savedListings;
          this.errorMessage = null;
        },
        error: (err) => {
          if (!err.errorMessage) {
            this.errorMessage = 'Could not connect to server! Try again later!';
            return;
          }
          this.errorMessage = err.errorMessage;
        },
      });
    }
  }

  handleFormSubmit(value: { searchInput: string; sortType: string }) {
    this.filteredListings =
      this.savedListings
        ?.filter(
          (x) =>
            x.item.toLowerCase().includes(value.searchInput.toLowerCase()) ||
            x.brand.toLowerCase().includes(value.searchInput.toLowerCase())
        )
        .sort((a, b): any => {
          if (value.sortType === 'priceAscending') {
            return a.price - b.price;
          } else if (value.sortType === 'priceDescending') {
            return b.price - a.price;
          } else if (value.sortType === 'a-z') {
            return a.item.localeCompare(b.item);
          } else if (value.sortType === 'z-a') {
            return b.item.localeCompare(a.item);
          }
        }) || null;
  }
}
