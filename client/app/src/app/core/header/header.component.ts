import { Router } from '@angular/router';
import { Component, OnInit, HostListener } from '@angular/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userId: string | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
  }

  @HostListener('window:storage', ['$event'])
  onStorageChange(e: Event): void {
    this.userId = localStorage.getItem('userId');
  }

  logoutUser(): void {
    localStorage.removeItem('userId');
    window.dispatchEvent(new Event('storage'));
    this.router.navigate(['/']);
  }
}
