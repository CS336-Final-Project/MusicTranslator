import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MusixmatchService {
  private readonly apiUrl = 'https://api.musixmatch.com/ws/1.1';
  private readonly apiKey = 'ec38857dd7a49d6164ba60cc0c06e45d';

  constructor(private http: HttpClient) {}

  getLyrics(trackId: number): Observable<string> {
    const url = `${this.apiUrl}/track.lyrics.get?track_id=${trackId}&apikey=${this.apiKey}`;
    return this.http.get<any>(url).pipe(
      map((response) => {
        const lyrics = response?.message?.body?.lyrics?.lyrics_body;
        return lyrics || 'Lyrics not available.';
      }),
      catchError(this.handleError)
    );
  }

  searchTracks(query: string): Observable<any[]> {
    const url = `${this.apiUrl}/track.search?q_track=${encodeURIComponent(
      query
    )}&apikey=${this.apiKey}`;
    return this.http.get<any>(url).pipe(
      map((response) => response?.message?.body?.track_list || []),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Musixmatch API error:', error);
    return throwError(() => new Error('An error occurred while fetching data.'));
  }
}
