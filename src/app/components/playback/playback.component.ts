import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-playback',
  standalone: true,
  imports: [MatToolbarModule, MatSliderModule],
  templateUrl: './playback.component.html',
  styleUrl: './playback.component.css'
})
export class PlaybackComponent {

}
