import { Injectable } from '@angular/core';
import { from, Observable, throwError, catchError, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { getLyrics, getSong, searchSong } from 'genius-lyrics-api';

@Injectable({
  providedIn: 'root'
})
export class GeniusService {
  private readonly apiKey = environment.geniusAccessToken;

  constructor() {}

  // Get song details by title and artist
  getSongDetails(title: string, artist: string): Observable<any> {
    const options = {
      apiKey: this.apiKey,
      title,
      artist,
      optimizeQuery: true,
    };

    return from(getSong(options)).pipe(
      catchError((error) => {
        console.error('Error fetching song details:', error);
        return throwError(() => new Error('Failed to fetch song details from Genius API'));
      })
    );
  }

  // Get lyrics for a specific songgetSongLyrics(url: string): Observable<string | null> {
    getSongLyrics(options: { title?: string, url: string; apiKey?: string }): Observable<string | null> {
      const input = options.apiKey ? options : options.url ? options: options.title;
    
      console.log('Getting lyrics with:', input);
      
      return from(getLyrics(input)).pipe(
        catchError((error) => {
          console.error('Error fetching song lyrics:', error.message || error);
          return throwError(() => new Error('Failed to fetch song lyrics from Genius API'));
        }),
        // Log the results
        tap((lyrics) => {
          console.log('Fetched lyrics:', lyrics);
        })
      );
    }    
}
