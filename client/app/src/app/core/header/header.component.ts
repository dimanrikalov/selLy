import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
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

  logoutUser(): void {
    console.log('logged out');
    localStorage.clear();
  }
}
