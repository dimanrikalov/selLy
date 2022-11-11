import { Component, OnInit } from '@angular/core';
import VanillaTilt from 'vanilla-tilt';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }
  ngOnInit(): void {
    VanillaTilt.init(document.querySelectorAll('.tilt') as any);
  }

}
