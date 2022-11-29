import { IListing } from '../interfaces/Listing';
import { Component, OnInit } from '@angular/core';
import { ListingsApiService } from '../services/listings-api.service';

@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.css'],
})
export class CatalogPageComponent implements OnInit {
  allListings: IListing[] | null = null;
  searchedListings: IListing[] | null = null;
  errorMessage: string | null = 'Fetching...';

  constructor(private listingsApiService: ListingsApiService) {}

  ngOnInit(): void {
    this.listingsApiService.loadListings().subscribe({
      next: (value: IListing[] | null) => {
        this.errorMessage = null;
        this.allListings = value;
        this.searchedListings = value;
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

  handleFormSubmit(value: { searchInput: string; sortType: string }) {
    this.searchedListings =
      this.allListings
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
