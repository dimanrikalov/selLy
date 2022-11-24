import VanillaTilt from 'vanilla-tilt';
import { IListing } from '../interfaces/Listing';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ListingDetailsService } from '../services/listing-details.service';
import { ListingOperationsService } from '../services/listing-operations.service';
import { CommentApiService } from '../services/comment-api.service';

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
    private listingOperationsService: ListingOperationsService,
    private commentOperationsService: CommentApiService,
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

  saveListing(listingId: string, loggedUserId: string) {
    this.listingOperationsService.saveListing(listingId, loggedUserId).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  deleteListing(listingId: string, loggedUserId: string) {
    this.listingOperationsService.deleteListing(listingId, loggedUserId).subscribe({
      next(value) {
        console.log(value);
        //redirect to catalog
      },
      error(err) {
        console.log(err);
      }
    })
  }

  comment(value: {content: string}) {
    this.commentOperationsService.create(value.content, this.loggedUserId!, this.listingId!).subscribe({
      next(response) {
        console.log(response);
        //update the current page without refreshing
      },
      error(err) {
        console.log(err);
      }
    })
  }

  editComment(value:{newContent: string}, commentId: string) {
    this.commentOperationsService.edit(value.newContent, this.loggedUserId!, this.listingId!, commentId!).subscribe({
      next(response) {
        console.log(response);
        //update the current page without refreshing
      },
      error(err) {
        console.log(err);
      }
    })
  }


  deleteComment(commentId: string) {
    this.commentOperationsService.delete(this.listingId!, commentId, this.loggedUserId!).subscribe({
      next(response) {
        console.log(response);
        //update the current page without refreshing
      },
      error(err) {
        console.log(err);
      }
    })
  }
}
