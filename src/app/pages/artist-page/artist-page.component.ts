import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify/spotify.service';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { MusicCardComponent } from '../../components/music-card/music-card.component';

@Component({
  selector: 'app-artist-page',
  standalone: true,
  imports: [MusicCardComponent],
  templateUrl: './artist-page.component.html',
  styleUrls: ['./artist-page.component.css'] // Corrected property name (was "styleUrl")
})
export class ArtistPageComponent implements OnInit {
  artistID: string = '';
  artistName: string = '';
  artistTopTracks: Array<{ name: string, id: string, isrc: string, image: string }> = []; // Correctly typed and initialized


  constructor(private spotifyService: SpotifyService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.artistID = params.get('artistID') || ''; // Ensure a fallback value is set
      console.log('Artist ID from Artist Card:', this.artistID);

      if (this.artistID) {
        this.loadArtistTopTracks(); // Fetch top tracks only if artistID is valid
      }
    });
    this.spotifyService.getArtist(this.artistID).then((artistName) => (this.artistName = artistName));
  }

  loadArtistTopTracks(): void {
    this.spotifyService
      .getArtistTopTracks(this.artistID)
      .then((response) => {
        this.artistTopTracks = response;
      });
  }
}
