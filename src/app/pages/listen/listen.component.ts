import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MusixmatchService } from '../../services/musixmatch/musixmatch.service';

@Component({
  selector: 'app-listen',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule, HttpClientModule],
  templateUrl: './listen.component.html',
  styleUrls: ['./listen.component.css'],
})
export class ListenComponent implements OnInit {
  originalSubtitles: string = '';
  translatedSubtitles: string = '';
  error: string = '';

  constructor(private musixmatchService: MusixmatchService) {}

  ngOnInit(): void {
    const commontrackId = 287164945; // Replace with the actual track ID
    const selectedLanguage = 'it'; // Replace with the desired language code

    this.musixmatchService
      .getTranslatedSubtitle(commontrackId, selectedLanguage)
      .subscribe({
        next: (response: any) => {
          const subtitle = response?.message?.body?.subtitle;
          const translatedSubtitle = response?.message?.body?.subtitle_translated;

          if (subtitle && translatedSubtitle) {
            this.originalSubtitles = subtitle.subtitle_body;
            this.translatedSubtitles = translatedSubtitle.subtitle_body;
          } else {
            this.error = 'Subtitles or translation not available.';
          }
        },
        error: (err: any) => {
          console.error('Error fetching subtitles:', err);
          this.error = err.message || 'Failed to fetch subtitles.';
        },
      });
  }
}
