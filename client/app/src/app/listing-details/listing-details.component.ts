import VanillaTilt from 'vanilla-tilt';
import { IListing } from '../interfaces/Listing';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentApiService } from '../services/comment-api.service';
import { ListingDetailsService } from '../services/listing-details.service';
import { ListingOperationsService } from '../services/listing-operations.service';

@Component({
  selector: 'app-listing-details',
  templateUrl: './listing-details.component.html',
  styleUrls: ['./listing-details.component.css'],
})
export class ListingDetailsComponent implements OnInit {
  listing: IListing | any = null;
  listingId: string | null = null;
  loggedUserId: string | null = localStorage.getItem('userId');
  textAreaContent: string | null = null;
  editingMode: boolean = false;
  commentIdEdit: string | null = null;
  errorMessage: string | null = 'Fetching data...';

  constructor(
    private listingOperationsService: ListingOperationsService,
    private listingDetailsService: ListingDetailsService,
    private commentOperationsService: CommentApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.listingId = params['id'];
    });
  }

  ngOnInit(): void {
    VanillaTilt.init(document.querySelectorAll('.tilt') as any);
    this.listingDetailsService.loadListing(this.listingId).subscribe({
      next: (listing) => {
        this.listing = listing;
        this.errorMessage = null;
      },
      error: (err) => {
        if (!err.errorMessage) {
          this.errorMessage = 'Could not connect to server! Try again later!';
          return;
        }
        this.errorMessage = err.errorMessage;
      },
    });
  }

  saveListing(listingId: string, loggedUserId: string) {
    this.listingOperationsService
      .saveListing(listingId, loggedUserId)
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  deleteListing(listingId: string, loggedUserId: string | null) {
    this.listingOperationsService
      .deleteListing(listingId, loggedUserId)
      .subscribe({
        next: (value) => {
          console.log(value);
          this.router.navigate(['/catalog']);
        },
        error(err) {
          console.log(err);
        },
      });
  }

  changeMode(commentId: string) {
    this.commentOperationsService
      .get(this.listingId, this.loggedUserId, commentId)
      .subscribe({
        next: (comment: any) => {
          this.editingMode = true;
          this.commentIdEdit = commentId;
          document.querySelector('textarea')!.value = comment.content;
          const button = document.querySelector(
            '.submit-btn'
          ) as HTMLElement | null;
          button!.innerText = 'Edit';
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  comment = (
    value: { content: string },
    editingMode: boolean,
    commentIdEdit: any
  ) => {
    if (!editingMode) {
      this.commentOperationsService
        .create(value.content, this.loggedUserId!, this.listingId!)
        .subscribe({
          next: (response: any) => {
            console.log(response);
            this.listing = response.listing;
            document.querySelector('textarea')!.value = '';
          },
          error(err) {
            console.log(err);
          },
        });

      return;
    }

    this.commentOperationsService
      .edit(value.content, this.loggedUserId!, this.listingId!, commentIdEdit)
      .subscribe({
        next: (response: any) => {
          console.log(response);
          this.listing = response.listing;
          document.querySelector('textarea')!.value = '';
        },
        error(err) {
          console.log(err);
        },
      });
    this.editingMode = false;
  };

  deleteComment(commentId: string) {
    this.commentOperationsService
      .delete(this.listingId!, commentId, this.loggedUserId!)
      .subscribe({
        next: (response: any) => {
          this.listing = response.listing;
        },
        error(err) {
          console.log(err);
        },
      });
  }
}
