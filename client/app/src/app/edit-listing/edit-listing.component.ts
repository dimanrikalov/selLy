import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListingOperationsService } from '../services/listing-operations.service';

@Component({
  selector: 'app-edit-listing',
  templateUrl: './edit-listing.component.html',
  styleUrls: ['./edit-listing.component.css']
})
export class EditListingComponent implements OnInit {

  listingId : string | null = null;

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

    this.editListingService.editListing(value, this.listingId).subscribe({
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
