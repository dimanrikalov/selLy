import VanillaTilt from 'vanilla-tilt';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css'],
})
export class ErrorPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    VanillaTilt.init(document.querySelectorAll('.tilt') as any);
  }
}
