import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-music-card',
  standalone: true,
  imports: [MatCardModule, RouterLink],
  templateUrl: './music-card.component.html',
  styleUrl: './music-card.component.css'
})
export class MusicCardComponent {
  topTracks = input.required<string>();
  //topArtists = input.required<string[]>();
}
