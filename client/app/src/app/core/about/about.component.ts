import VanillaTilt from 'vanilla-tilt';
import { Component, OnInit } from '@angular/core';
import { AboutDetailsService } from 'src/app/services/about-details.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  stats: any = null;

  constructor(private aboutDetailsService: AboutDetailsService) {}
  ngOnInit(): void {
    VanillaTilt.init(document.querySelectorAll('.tilt') as any);
    this.aboutDetailsService.loadStats().subscribe({
      next: (stats) => {
        this.stats = stats;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
