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
  loggedUserId : string | null = localStorage.getItem('userId');

  constructor(private listingDetailsService: ListingDetailsService) { }

  ngOnInit(): void {
    this.listingDetailsService.loadListing().subscribe({
      next: (listing) => {
        // localStorage.setItem('userId', '636fea4d871ff87fe625a7aa');
        console.log(listing);
        this.listing = listing;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
