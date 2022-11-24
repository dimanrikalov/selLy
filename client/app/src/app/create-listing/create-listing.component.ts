import { Component, OnInit } from '@angular/core';
import { ListingOperationsService } from '../services/listing-operations.service';

@Component({
  selector: 'app-create-listing',
  templateUrl: './create-listing.component.html',
  styleUrls: ['./create-listing.component.css'],
})
export class CreateListingComponent implements OnInit {
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
