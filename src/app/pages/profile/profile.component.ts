import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { SpotifyService } from '../../services/spotify/spotify.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatToolbarModule, 
    MatIconModule, 
    CommonModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user: { display_name: string; image: string; email: string; id: string} | null = null;
  errorMessage: string = "";
  isTokenRefreshing: boolean = false;

  constructor(
    private spotifyService: SpotifyService, 
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    if(!this.spotifyService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    if (this.spotifyService.isLoggedIn()) {
      this.fetchUserInfo();
    }
  }

  fetchUserInfo() {
    this.spotifyService.getUser()
      .then((userInfo) => {
        if (typeof userInfo === "string") {
          this.errorMessage = userInfo;
          this.snackBar.open(userInfo, 'Close', { duration: 3000 });
        } else {
          this.user = userInfo;
        }
      })
      .catch((error) => {
        this.errorMessage = "Failed to fetch user info";
        this.snackBar.open(this.errorMessage, 'Close', { duration: 3000 });
      });
  }

  manualTokenRefresh() {
    this.isTokenRefreshing = true;
    this.errorMessage = "";

    this.spotifyService.refreshAccessToken().subscribe({
      next: () => {
        this.isTokenRefreshing = false;
        this.snackBar.open('Token refreshed successfully', 'Close', { duration: 3000 });
        // Re-fetch user info after token refresh
        this.fetchUserInfo();
      },
      error: (error) => {
        this.isTokenRefreshing = false;
        this.errorMessage = "Failed to refresh token. Please log in again.";
        this.snackBar.open(this.errorMessage, 'Close', { 
          duration: 3000 
        });
        console.error('Token refresh error:', error);
      }
    });
  }
}