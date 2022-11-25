import { Component, OnInit, HostListener } from '@angular/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  
  userId : string | null = null;

  constructor() {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
  }


  @HostListener('window:storage')
  onStorageChange() {
    this.userId = localStorage.getItem('userId') || null;
  }

  logoutUser(): void {
    console.log('logged out');
    localStorage.clear();
    this.userId = null;
  }
}
