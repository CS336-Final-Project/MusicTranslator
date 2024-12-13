import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MusixMatchService } from '../../services/musixmatch/musixmatch.service';

@Component({
  selector: 'app-listen',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule, HttpClientModule],
  templateUrl: './listen.component.html',
  styleUrls: ['./listen.component.css'],
})
export class ListenComponent {
  originalSubtitles: string = 'Loading original subtitles...';
  translatedSubtitles: string = 'Loading translated subtitles...';
  error: string = '';
  isLoading: boolean = true;

  constructor(private musixmatchService: MusixMatchService) {}

  // ngOnInit(): void {
  //   const commontrackId = 287164945;
  //   const selectedLanguage = 'it';

  //   this.musixmatchService
  //     .getTranslatedSubtitle(commontrackId, selectedLanguage)
  //     .subscribe({
  //       next: (response: any) => {
  //         const subtitle = response?.message?.body?.subtitle;
  //         const translatedSubtitle = response?.message?.body?.subtitle_translated;

  //         if (subtitle?.subtitle_body) {
  //           this.originalSubtitles = subtitle.subtitle_body;
  //         } else {
  //           this.originalSubtitles = 'Original subtitles not available.';
  //         }

  //         if (translatedSubtitle?.subtitle_body) {
  //           this.translatedSubtitles = translatedSubtitle.subtitle_body;
  //         } else {
  //           this.translatedSubtitles = 'Translated subtitles not available.';
  //         }
  //       },
  //       error: (err: any) => {
  //         console.error('Error fetching subtitles:', err);
  //         this.error = 'An error occurred while fetching subtitles.';
  //       },
  //       complete: () => {
  //         this.isLoading = false;
  //       },
  //     });
  // }
}