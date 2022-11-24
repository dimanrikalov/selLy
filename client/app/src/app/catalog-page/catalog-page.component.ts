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

  constructor(private listingsApiService: ListingsApiService) {}

  ngOnInit(): void {
    this.listingsApiService.loadListings().subscribe({
      next: (value) => {
        this.allListings = value;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  
  handleFormSubmit(value: { searchInput: string; sortType: string }) {
    console.log(value.sortType);
    this.allListings =
      this.allListings
        ?.filter(
          (x) =>
            x.item.toLowerCase().includes(value.searchInput.toLowerCase()) ||
            x.brand.toLowerCase().includes(value.searchInput.toLowerCase())
        )
        .sort((a, b): any => {
          if (value.sortType === 'priceAscending') {
            console.log('sort by priceAscending')
            return a.price - b.price;
          } else if (value.sortType === 'priceDescending') {
            console.log('sort by priceDescending')
            return b.price - a.price;
          } else if (value.sortType === 'a-z') {
            console.log('sort by a-z')
            return a.item.localeCompare(b.item);
          } else if (value.sortType === 'z-a') {
            console.log('sort by z-a')
            return b.item.localeCompare(a.item);
          }
        }) || null;
  }
}
