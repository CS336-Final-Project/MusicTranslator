import { Component, input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
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

export class PlaybackComponent implements OnInit {
  currentTrack: string = "";

  constructor(private spotifyService: SpotifyService){}

  ngOnInit(): void {
    if (this.spotifyService.isLoggedIn()) {
      this.spotifyService.getCurrentPlayingTrack()
       .then((currentTrack) => {
        this.currentTrack = currentTrack.name;
        console.log(currentTrack)
       });
    }
  }
}