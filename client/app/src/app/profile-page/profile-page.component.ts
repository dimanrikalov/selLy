import VanillaTilt from 'vanilla-tilt';
import { IUser } from '../interfaces/User';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  user: IUser | null = null;

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    VanillaTilt.init(document.querySelectorAll('.tilt') as any);
    this.profileService.loadProfile().subscribe({
      next: (user) => {
        console.log(user);
        this.user = user;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
