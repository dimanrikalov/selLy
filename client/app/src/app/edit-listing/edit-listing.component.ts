import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListingOperationsService } from '../services/listing-operations.service';

@Component({
  selector: 'app-edit-listing',
  templateUrl: './edit-listing.component.html',
  styleUrls: ['./edit-listing.component.css']
})
export class EditListingComponent implements OnInit {

  errorMessage : string | null = null;
  listingId : string | null = null;
  loggedUserId: string | null = localStorage.getItem('userId');


  constructor(
    private editListingService: ListingOperationsService,
    private activatedRoute: ActivatedRoute
    ) { 
      this.activatedRoute.params.subscribe((params) => {
        this.listingId = params['id'];
      });
    }

  ngOnInit(): void {
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
    if(this.listingId === null) {
      return;
    }

    if(value.item!.length < 2 || value.item.length > 20) {
      this.errorMessage = 'Item length must be in range 2-20!'
      return;
    }

    if(!value.imageUrl.startsWith('http://') && !value.imageUrl.startsWith('https://')) {
      this.errorMessage = 'Invalid image URL! (Must start with http:// or https://)';
      return;
    }

    if(value.description.length < 15) {
      this.errorMessage = 'Item\'s description must be at least 15 characters long!';
      return; 
    }

    if(!value.city.match('[A-Z][a-z]+')) {
      this.errorMessage = 'City name must start with capital letter!';
      return;
    }

    if(!value.country.match('[A-Z][a-z]+')) {
      this.errorMessage = 'Country name must start with capital letter!';
      return;
    }

    if(Number(value.price) < 0) {
      this.errorMessage = 'Minimum price is 0.00 euros!';
      return;
    }

    this.errorMessage = null;

    this.editListingService.editListing(value, this.listingId, this.loggedUserId!).subscribe({
      next: (response) => {
        console.log(response);
        //redirect to catalog
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

}
