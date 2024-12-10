import { Component, OnInit } from '@angular/core';
import { MusicCardComponent } from '../../../components/music-card/music-card.component';
import { SpotifyService } from '../../../services/spotify/spotify.service';

@Component({
  selector: 'app-users-top',
  standalone: true,
  imports: [MusicCardComponent],
  templateUrl: './users-top.component.html',
  styleUrl: './users-top.component.css'
})
export class UsersTopComponent implements OnInit {
  usersTopArtists: Array<string> = [];
  usersTopTracks: Array<string> = [];
  usersRecentlyPlayedTracks: Array<string> = [];
  currentPlayingTrack: string = '';

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.spotifyService.getUsersTopArtists().then((topArtists) => (this.usersTopArtists = topArtists));
    this.spotifyService.getUsersTopTracks().then((topTracks) => (this.usersTopTracks = topTracks));
    this.spotifyService.getUsersRecentlyPlayedTracks().then((recentlyPlayed) => (this.usersRecentlyPlayedTracks = recentlyPlayed));
  }
}
