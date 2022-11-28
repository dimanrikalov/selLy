import VanillaTilt from 'vanilla-tilt';
import { IListing } from '../interfaces/Listing';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit, SimpleChange } from '@angular/core';
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
  textAreaContent: string | null = null;
  editingMode: boolean = false;
  commentIdEdit : string | null = null;
  
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

  @Input() textArea:any;

  ngOnChanges(changes: SimpleChange) {
    console.log(changes);
  }

  ngOnInit(): void {
    VanillaTilt.init(document.querySelectorAll('.tilt') as any);
      this.listingDetailsService.loadListing(this.listingId).subscribe({
        next: (listing) => {
          this.listing = listing;
        },
        error: (err) => {
          if(err.message.startsWith('Http failure response')) {
            console.log(
              'Details page could not connect to server! Trying again in 10 seconds...'
            );
          }
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

  changeMode(commentId: string) {
    this.editingMode = true;
    this.commentIdEdit = commentId;
    //fill textarea
  }

  comment = (value: {content: string}, editingMode: boolean, commentIdEdit: any) => {
    if(!editingMode) {
      this.commentOperationsService.create(value.content, this.loggedUserId!, this.listingId!).subscribe({
        next(response) {
          console.log(response);
          //update the current page without refreshing
        },
        error(err) {
          console.log(err);
        }
      })
      return;
    }

    this.commentOperationsService.edit(value.content, this.loggedUserId!, this.listingId!, commentIdEdit).subscribe({
      next(response) {
        console.log(response);
        
      },
      error(err) {
        console.log(err);
      }
    })
    this.editingMode = false;
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
