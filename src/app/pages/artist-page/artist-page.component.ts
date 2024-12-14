import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify/spotify.service';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-artist-page',
  standalone: true,
  imports: [MatTableModule, RouterLink],
  templateUrl: './artist-page.component.html',
  styleUrls: ['./artist-page.component.css'],
})
export class ArtistPageComponent implements OnInit {
  artistID: string = '';
  artistName: string = '';
  artistTopTracks: Array<{ 
    name: string; 
    id: string; 
    image: string; 
    isrc: string; 
    album: string; 
    popularity: number; 
  }> = [];
  
  // Add all column IDs defined in the HTML template to this array
  displayedColumns: string[] = ['image', 'name', 'album', 'popularity'];
  dataSource = this.artistTopTracks;

  constructor(private spotifyService: SpotifyService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.artistID = params.get('artistID') || '';
      console.log('Artist ID from URL:', this.artistID);

      if (this.artistID) {
        this.loadArtistData();
      }
    });
  }

  loadArtistData(): void {
    this.spotifyService.getArtist(this.artistID).then((artistName) => (this.artistName = artistName));

    this.spotifyService.getArtistTopTracks(this.artistID).then((tracks) => {
      this.artistTopTracks = tracks;
      this.dataSource = [...this.artistTopTracks]; // Update table data
    });
  }
}