import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from '../../services/spotify/spotify.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errorMessage: string = '';

  constructor(
    private spotifyService: SpotifyService,
    private router: Router
  ) {
    // Check if already logged in and redirect
    if (this.spotifyService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  loginToSpotify() {
    try {
      this.spotifyService.getAccessToken();
    } catch (error: any) {
      console.error("Error during Spotify login:", error);
      this.errorMessage = "Failed to initiate login. Please try again.";
    }
  }  
}