import VanillaTilt from 'vanilla-tilt';
import { Component, OnInit } from '@angular/core';
import { AboutDetailsService } from 'src/app/services/about-details.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  stats: {
    userCount: number;
    listingCount: number;
    commentCount: number;
    savedCount: number;
  } | null = null;

  errorMessage: string | null = null;

  constructor(private aboutDetailsService: AboutDetailsService) {}
  ngOnInit(): void {
    VanillaTilt.init(document.querySelectorAll('.tilt') as any);
    this.aboutDetailsService.loadStats().subscribe({
      next: (stats: any) => {
        this.stats = stats;
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
}
