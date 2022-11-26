import { Component, OnInit, HostListener } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css'],
})
export class WelcomePageComponent implements OnInit {
  userName: string | null = null;
  userId: string | null = null;

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    if(this.userId !== null) {
      this.profileService.loadProfile(this.userId).subscribe({
        next: (user) => {
          this.userName = `, ${user.name.slice(0, user.name.indexOf(' '))}`;
        },
        error: (err) => {
          this.userName = ' to Selly';
          if(err.message.startsWith('Http failure response')) {
            console.log(
              'Welcome page could not connect to server! Trying again in 10 seconds...'
            );
            setTimeout(() => {
              this.ngOnInit();
            }, 5000);
          }
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
