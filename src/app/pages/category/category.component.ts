import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify/spotify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})

export class CategoryComponent implements OnInit {
  playlistID: string = '';
  languagePlaylist: Array<{ name: string, id: string, tracks: object }> = [];

  constructor(public spotifyService: SpotifyService, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.playlistID = params.get('playlistID') || ''; // Ensure a fallback value is set
      console.log('Playlist ID from Category Card:', this.playlistID);

      if (this.playlistID) {
        this.loadPlaylistTracks(); // Fetch top tracks only if artistID is valid
      }
    });
  }

  loadPlaylistTracks(): void {
    this.spotifyService
      .getPlaylist(this.playlistID)
      .then((response) => {
        this.languagePlaylist = response;
      });
  }
}
