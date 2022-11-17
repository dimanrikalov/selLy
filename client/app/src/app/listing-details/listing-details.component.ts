import { IListing } from '../interfaces/Listing';
import { Component, OnInit } from '@angular/core';
import { ListingDetailsService } from '../services/listing-details.service';

@Component({
  selector: 'app-listing-details',
  templateUrl: './listing-details.component.html',
  styleUrls: ['./listing-details.component.css']
})
export class ListingDetailsComponent implements OnInit {

  listing: IListing | null = null;

  constructor(private listingDetailsService: ListingDetailsService) { }

  ngOnInit(): void {
    this.listingDetailsService.loadListing().subscribe({
      next: (listing) => {
        console.log(listing);
        this.listing = listing;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
