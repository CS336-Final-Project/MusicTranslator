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

  getTranslatedSubtitles(
    trackId: number,
    selectedLanguage: string,
    minCompleted: number = 1 // Default to fully translated
  ): Observable<any> {
    const url = `${this.apiUrl}/track.subtitle.translation.get?track_id=${trackId}&selected_language=${selectedLanguage}&min_completed=${minCompleted}&apikey=${this.apiKey}`;
    return this.http.get<any>(url).pipe(
      map((response) => response?.message?.body?.subtitle?.subtitle_body || 'Translated subtitles not available.'),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Musixmatch API error:', error);
    return throwError(() => new Error('An error occurred while fetching data from Musixmatch API.'));
  }
}