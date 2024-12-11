import { Component, OnInit } from '@angular/core';
//import { RouterOutlet, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MusixmatchService } from '../../services/musixmatch/musixmatch.service';


@Component({
  selector: 'app-listen',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, CommonModule],
  templateUrl: './listen.component.html',
  styleUrl: './listen.component.css'
})
export class ListenComponent {
  // translatedSubtitles: string = ''; // Store subtitles to display
  // error: string = ''; // Store error messages

  // constructor(private musixmatchService: MusixmatchService) {}

  // ngOnInit(): void {
  //   // Call the Musixmatch API on initialization
  //   const trackId = 12345678; // Replace with the actual track ID
  //   const selectedLanguage = 'en'; // Replace with the desired language code (e.g., 'en' for English)

  //   this.musixmatchService
  //     .getTranslatedSubtitles(trackId, selectedLanguage)
  //     .subscribe({
  //       next: (subtitles) => {
  //         this.translatedSubtitles = subtitles;
  //       },
  //       error: (err) => {
  //         console.error('Error fetching subtitles:', err);
  //         this.error = err.message || 'Failed to fetch subtitles.';
  //       },
  //     });
  // }
}