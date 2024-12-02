import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { SpotifyService } from '../../services/spotify/spotify.service';
import { MusicCardComponent } from '../../components/music-card/music-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    CommonModule,
    MusicCardComponent
],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  userName: string = '';
  usersSavedTracks: Array<string> = [];
  savedAlbums: Array<string> = [];
  usersTopArtists: Array<string> = [];
  usersTopTracks: Array<string> = [];
  usersRecentlyPlayedTracks: Array<string> = [];
  getAlbumInfo: string = '';

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    if (this.spotifyService.isLoggedIn()) {
      this.spotifyService.getUserName().then((name) => (this.userName = name));
      this.spotifyService.getUsersSavedAlbums().then((albums) => (this.savedAlbums = albums));
      this.spotifyService.getUsersSavedTracks().then((tracks) => (this.usersSavedTracks = tracks));
      this.spotifyService.getUsersTopArtists().then((topArtists) => (this.usersTopArtists = topArtists));
      this.spotifyService.getUsersTopTracks().then((topTracks) => (this.usersTopTracks = topTracks));
      this.spotifyService.getUsersRecentlyPlayedTracks().then((recentlyPlayed) => (this.usersRecentlyPlayedTracks = recentlyPlayed));
    }
  }
}
