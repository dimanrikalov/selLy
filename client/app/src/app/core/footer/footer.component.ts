import { Router } from '@angular/router';
import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  userId: string | null = localStorage.getItem('userId');
  year: number | null = null;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.year = new Date().getFullYear();
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
