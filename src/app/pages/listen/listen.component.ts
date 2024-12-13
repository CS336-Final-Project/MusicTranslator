import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MusixMatchService } from '../../services/musixmatch/musixmatch.service';
import { GeniusService } from '../../services/genius/genius.service';

@Component({
  selector: 'app-listen',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule, HttpClientModule],
  templateUrl: './listen.component.html',
  styleUrls: ['./listen.component.css'],
})
export class ListenComponent implements OnInit {
  originalSubtitles: string = 'Loading original subtitles...';
  translatedSubtitles: string = 'Loading translated subtitles...';
  error: string = '';
  isLoading: boolean = true;
  lyrics: string = '';
  errorMessage: string = '';

  trackDetails: string = 'Loading track details...';

  constructor(
    private musixmatchService: MusixMatchService,
    private geniusService: GeniusService
  ) {}

  ngOnInit(): void {
    const selectedLanguage = 'it'; // Example: English language
    const commontrackID = 287164945; // Example: Replace with a valid track ID
    const minCompleted = 1;

    this.fetchTranslatedSubtitles(selectedLanguage, commontrackID, minCompleted);

    const trackID = 287164945; // Example track ID, replace with real data
    this.fetchTrackDetails(trackID);
  }

  fetchTranslatedSubtitles(selectedLanguage: string, commontrackID: number, minCompleted: number): void {
    this.isLoading = true;
    this.musixmatchService.getTranslatedSubtitle(selectedLanguage, commontrackID, minCompleted).subscribe({
      next: (response) => {
        const subtitle = response.message.body.subtitle?.subtitle_body || 'No subtitles available';
        this.translatedSubtitles = subtitle;
        console.log(this.translatedSubtitles);
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.message || 'An error occurred';
        console.error('Error fetching subtitles:', err);
        this.isLoading = false;
      }
    });
  }

  fetchTrackDetails(trackID: number): void {
    this.musixmatchService.getTrack(trackID).subscribe({
      next: (response) => {
        const track = response.message.body.track;
        if (track) {
          this.trackDetails = `Track Name: ${track.track_name}, Artist: ${track.artist_name}`;
          console.log(this.trackDetails);
        } else {
          this.trackDetails = 'No track details available';
        }
        console.log('Track Details:', this.trackDetails);
      },
      error: (err) => {
        this.errorMessage = err.message || 'An error occurred while fetching track details';
        console.error('Error fetching track details:', err);
      }
    });
  }
}