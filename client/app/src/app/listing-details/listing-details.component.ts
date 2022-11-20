import VanillaTilt from 'vanilla-tilt';
import { IListing } from '../interfaces/Listing';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ListingDetailsService } from '../services/listing-details.service';

@Component({
  selector: 'app-listing-details',
  templateUrl: './listing-details.component.html',
  styleUrls: ['./listing-details.component.css'],
})
export class ListingDetailsComponent implements OnInit {
  listing: IListing | null = null;
  listingId: string | null = null;
  loggedUserId: string | null = localStorage.getItem('userId');

  constructor(
    private listingDetailsService: ListingDetailsService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.listingId = params['id'];
    });
  }

  ngOnInit(): void {
    VanillaTilt.init(document.querySelectorAll('.tilt') as any);
      this.listingDetailsService.loadListing(this.listingId).subscribe({
        next: (listing) => {
          // localStorage.setItem('userId', '636fea4d871ff87fe625a7aa');
          this.listing = listing;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
