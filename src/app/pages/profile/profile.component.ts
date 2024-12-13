import { Component, OnInit } from '@angular/core';
// import { RouterOutlet, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { SpotifyService } from '../../services/spotify/spotify.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user: { display_name: string; image: string} | null = null;
  errorMessage: string = "";

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    if (this.spotifyService.isLoggedIn()) {
      this.spotifyService.getUser()
        .then((userInfo) => {
          if (typeof userInfo === "string") {
            this.errorMessage = userInfo;
          } else {
            this.user = userInfo;
          }
        });
    }
  }
}
