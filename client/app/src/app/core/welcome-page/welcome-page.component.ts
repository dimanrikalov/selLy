import { Component, OnInit, HostListener } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css'],
})
export class WelcomePageComponent implements OnInit {
  userName: string | null = null;

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.profileService.loadProfile().subscribe({
      next: (user) => {
        this.userName = `, ${user.name
          .slice(0, user.name.indexOf(' '))}`;
      },
      error: (err) => {
        this.userName = ' to Selly';
        console.log(err);
      },
    });
  }
  
}

