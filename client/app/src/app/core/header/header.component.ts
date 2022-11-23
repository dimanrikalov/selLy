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
    // localStorage.setItem('userId', '636fea4d871ff87fe625a7aa');
    // this.userId = localStorage.getItem('userId');
  }
}
