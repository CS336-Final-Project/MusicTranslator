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
  trackImage = input.required<string>();
  trackName = input.required<string>();
  trackArtist = input.required<string>();
  trackID = input.required<string>();
  isrc = input.required<string>();
}
