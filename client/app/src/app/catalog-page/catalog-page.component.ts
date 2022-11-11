import { Component, OnInit } from '@angular/core';
import { IListing } from '../interfaces/Listing';
import { ListingsApiService } from '../services/listings-api.service';

@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.css']
})
export class CatalogPageComponent implements OnInit {

  allListings: IListing[] | null = null;

  constructor(private listingsApiService: ListingsApiService) { }

  ngOnInit(): void {
    this.listingsApiService.loadListings().subscribe({
      next: (value) => {
        this.allListings = value;
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

}
