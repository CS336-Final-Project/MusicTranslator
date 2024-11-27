import { Component } from '@angular/core';
import { SpotifyService } from '../services/spotify/spotify.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private spotifyService: SpotifyService) {}

  loginToSpotify() {
    this.spotifyService.getAccessToken();
  }

}
