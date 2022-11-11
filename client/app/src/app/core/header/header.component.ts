import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  
  constructor() {}

  ngOnInit(): void {
    this.initNavbar();
  }

  initNavbar () {
    const navbar: HTMLElement | null = document.querySelector('header');
    let prevScrollPos = window.scrollY;
    window.onscroll = function (): void {
      let currentScrollPos = window.scrollY;
      if (prevScrollPos > currentScrollPos) {
        navbar!.style.top = '0px';
      } else {
        navbar!.style.top = '-100px';
      }
      prevScrollPos = currentScrollPos;
    };
  }

}
