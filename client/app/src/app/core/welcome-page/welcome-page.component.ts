import { Component, OnInit, HostListener } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css'],
})
export class WelcomePageComponent implements OnInit {
  userName: string = ' to SelLy';
  userId: string | null = null;

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    if (this.userId) {
      this.profileService.loadProfile(this.userId).subscribe({
        next: (user) => {
          this.userName = `, ${user.name.slice(0, user.name.indexOf(' '))}`;
        },
        error: (err) => {
          this.userName = ' to Selly';
        },
      });
    }
  }

  @HostListener('window:storage', ['$event'])
  onStorageChange(e: Event): void {
    if (localStorage.getItem('userId')) {
      this.profileService.loadProfile(this.userId).subscribe({
        next: (user) => {
          this.userName = `, ${user.name.slice(0, user.name.indexOf(' '))}`;
        },
        error: (err) => {
          this.userName = ' to Selly';
          console.log(err);
        },
      });
    } else {
      this.userName = ' to Selly';
    }
  }
}
