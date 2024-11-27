import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { SpotifyService } from '../services/spotify/spotify.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatIconModule,
    CommonModule, // Include CommonModule here
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  userName: string = '';

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    if (this.spotifyService.isLoggedIn()) {
      this.spotifyService.getUserName().then((name) => (this.userName = name));
    }
  }
}
