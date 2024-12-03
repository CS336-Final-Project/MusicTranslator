import { Component, input } from '@angular/core';
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
  topTracks = input.required<string>();
  //topArtists = input.required<string[]>();
}
