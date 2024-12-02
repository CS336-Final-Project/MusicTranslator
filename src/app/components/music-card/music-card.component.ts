import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { SpotifyService } from '../../services/spotify/spotify.service';

@Component({
  selector: 'app-music-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './music-card.component.html',
  styleUrl: './music-card.component.css'
})
export class MusicCardComponent {
  userName: string = '';
  savedAlbums: string[] = [];
  // trackName: string = '';
  // albumnName: string = '';
  // artistName: string = '';
  // playlistName: string = '';
  // topTracks: any[] = [];
  // topArtists: any[] = [];


  constructor(private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    if (this.spotifyService.isLoggedIn()) {
      this.spotifyService.getUserName().then((name) => (this.userName = name));
      this.spotifyService.getUsersSavedAlbums().then((albums) => (this.savedAlbums = albums));
      // this.spotifyService.getArtistName().then((name) => (this.artistName = name));
      // this.spotifyService.getTrackName().then((name) => (this.trackName = name));
      // this.spotifyService.getAlbumName().then((name) => (this.albumnName = name));
      // this.spotifyService.getPlaylistName().then((name) => (this.playlistName = name));

      // this.spotifyService.getUsersTopItems('tracks').then((tracks) => (this.topTracks = tracks));
      // this.spotifyService.getUsersTopItems('artists').then((artists) => (this.topArtists = artists));
    }
  }

}
