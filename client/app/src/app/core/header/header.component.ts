import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  
  userId : string | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
  }

  logoutUser(): void {
    console.log('logged out');
    localStorage.removeItem('userId');
    this.userId = null;
    this.router.navigate(['/']);
  }
}
