import { Component, OnInit } from '@angular/core';
import { ListingOperationsService } from '../services/listing-operations.service';

@Component({
  selector: 'app-create-listing',
  templateUrl: './create-listing.component.html',
  styleUrls: ['./create-listing.component.css'],
})
export class CreateListingComponent implements OnInit {

  errorMessage: string | null = null;

  constructor(private createListingService: ListingOperationsService) {}

  ngOnInit(): void {}

  handleSubmitForm(value: {
    item: string;
    brand: string;
    imageUrl: string;
    description: string;
    city: string;
    country: string;
    price: string;
  }) {
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

    this.createListingService.createListing(value).subscribe({
      next: (response) => {
        console.log(response);
        //redirect to catalog or profile page
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
