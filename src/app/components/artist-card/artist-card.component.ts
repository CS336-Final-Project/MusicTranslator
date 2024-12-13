import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-artist-card',
  standalone: true,
  imports: [MatCardModule, RouterLink],
  templateUrl: './artist-card.component.html',
  styleUrl: './artist-card.component.css'
})
export class ArtistCardComponent {
  artistImage = input.required<string>();
  artistName = input.required<string>();
}
