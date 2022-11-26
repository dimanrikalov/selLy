import { Router } from '@angular/router';
import { IUser } from '../interfaces/User';
import { IListing } from '../interfaces/Listing';
import { ProfileService } from '../services/profile.service';
import { Component, OnInit , HostListener} from '@angular/core';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  user: IUser | null = null;
  userId: string | null = null;
  displayWelcome: boolean = false;
  filteredListings: IListing[] | null = null;
  innerWidth: any;

  constructor(
    private profileService: ProfileService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    if(this.innerWidth <= 1195) {
      this.displayWelcome= true;
    }

    this.userId = localStorage.getItem('userId');

    if(this.userId !== null) {
      this.profileService.loadProfile(this.userId).subscribe({
        next: (user) => {
          this.user = user;
          this.filteredListings = user.listings;
        },
        error: (err) => {
          if(err.message.startsWith('Http failure response')) {
            console.log(
              'Profile page could not connect to server! Trying again in 10 seconds...'
            );
          }
        }
      })
    } else {
      this.router.navigate(['/']);
    }
  }

  @HostListener('window:storage', ['$event'])
  onStorageChange(e: Event):void {
    if(this.userId !== null) {
      this.profileService.loadProfile(this.userId).subscribe({
        next: (user) => {
          this.user = user;
          this.filteredListings = user.listings;
        },
        error: (err) => {
          console.log(err);
        }
      })
    } else {
      this.router.navigate(['/']);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event : any) {
    if(event.target.innerWidth <= 1195) {
      this.displayWelcome = true;
    } else {
      this.displayWelcome = false;
    }
    this.innerWidth = window.innerWidth;
  }


  handleFormSubmit(value: { searchInput: string; sortType: string }) {
    this.filteredListings =
      this.user!.listings
        ?.filter(
          (x) =>
            x.item.toLowerCase().includes(value.searchInput.toLowerCase()) ||
            x.brand.toLowerCase().includes(value.searchInput.toLowerCase())
        )
        .sort((a, b): any => {
          if (value.sortType === 'priceAscending') {
            return a.price - b.price;
          } else if (value.sortType === 'priceDescending') {
            return b.price - a.price;
          } else if (value.sortType === 'a-z') {
            return a.item.localeCompare(b.item);
          } else if (value.sortType === 'z-a') {
            return b.item.localeCompare(a.item);
          }
          return;
        }) || null;
  }

}
