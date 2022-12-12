import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IListing } from '../interfaces/Listing';
import { ListingDetailsService } from '../services/listing-details.service';
import { ListingOperationsService } from '../services/listing-operations.service';

@Component({
  selector: 'app-edit-listing',
  templateUrl: './edit-listing.component.html',
  styleUrls: ['./edit-listing.component.css'],
})
export class EditListingComponent implements OnInit {
  errorMessage: string | null = null;
  listing: IListing | null = null;
  listingId: string | null = null;
  loggedUserId: string | null = localStorage.getItem('userId');

  item: string | null = null;
  brand: string | null = null;
  imageUrl: string | null = null;
  description: string | null = null;
  city: string | null = null;
  country: string | null = null;
  price: number | null = null;

  constructor(
    private listingDetailsService: ListingDetailsService,
    private editListingService: ListingOperationsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.listingId = params['id'];
    });
  }

  ngOnInit(): void {
    this.listingDetailsService.loadListing(this.listingId).subscribe({
      next: (listing) => {
        this.item = listing.item;
        this.brand = listing.brand;
        this.imageUrl = listing.imageUrl;
        this.description = listing.description;
        [this.city, this.country] = listing.location.split(', ');
        this.price = listing.price;
      },
      error: (err) => {
        if (err.message.startsWith('Http failure response')) {
          console.log(
            'Details page could not connect to server! Trying again in 10 seconds...'
          );
        }
      },
    });
  }

  handleSubmitForm(value: {
    item: string;
    brand: string;
    imageUrl: string;
    description: string;
    city: string;
    country: string;
    price: string;
  }) {
    if (this.listingId === null) {
      return;
    }

    if (value.item!.length < 2 || value.item.length > 20) {
      value.item = `${this.item}`;
    }

    if (value.brand.length === 0) {
      value.brand = `${this.brand}`;
    }

    if (
      !value.imageUrl.startsWith('http://') &&
      !value.imageUrl.startsWith('https://')
    ) {
      value.imageUrl = `${this.imageUrl}`;
    }

    if (value.description.length < 15) {
      value.description = `${this.description}`;
    }

    if (!value.city.match('[A-Z][a-z]+')) {
      value.city = `${this.city}`;
    }

    if (!value.country.match('[A-Z][a-z]+')) {
      value.country = `${this.country}`;
    }

    if (!value.price || Number(value.price) <= 0) {
      value.price = `${this.price}`;
    }

    this.errorMessage = null;

    this.editListingService
      .editListing(value, this.listingId, this.loggedUserId!)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigate([`catalog/${this.listingId}/details`]);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
