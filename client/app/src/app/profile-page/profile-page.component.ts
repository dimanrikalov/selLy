import { IUser } from '../interfaces/User';
import { Component, OnInit , HostListener} from '@angular/core';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  user: IUser | null = null;
  displayWelcome: boolean = false;
  innerWidth: any;
  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.profileService.loadProfile().subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  @HostListener('window:resize', ['$event'])
  onResize(event : any) {
    console.log(event);
    if(event.target.innerWidth < 1195) {
      this.displayWelcome = true;
    } else {
      this.displayWelcome = false;
    }
    this.innerWidth = window.innerWidth;
  }

}
