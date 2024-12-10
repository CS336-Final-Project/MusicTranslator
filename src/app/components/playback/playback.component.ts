import { Component, input } from '@angular/core';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSliderModule } from '@angular/material/slider';
import { SpotifyService } from '../../services/spotify/spotify.service';

@Component({
  selector: 'app-playback',
  standalone: true,
  imports: [MatToolbarModule, MatSliderModule, MatIconModule],
  templateUrl: './playback.component.html',
  styleUrl: './playback.component.css'
})

export class PlaybackComponent {
}
