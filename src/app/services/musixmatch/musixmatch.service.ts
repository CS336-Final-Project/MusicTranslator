import { Injectable } from '@angular/core';
import { Observable, throwError, catchError } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MusixMatchService {
  private readonly apiKey = environment.musixmatchApiKey;
  private readonly baseURL = 'https://api.musixmatch.com/ws/1.1';

  constructor(private http: HttpClient) {}

  getTrack(track_isrc: string): Observable<any> {
    const url = `${this.baseURL}/track.get`;
  
    const params = new HttpParams()
      .set('track_isrc', track_isrc) // Ensure this matches the API docs
      .set('apikey', this.apiKey);
  
    return this.http.get<any>(url, { params }).pipe(
      catchError((error) => {
        console.error('Error fetching track:', error);
        return throwError(() => new Error('Failed to fetch track details'));
      })
    );
  }

  getOriginalLyrics(track_isrc: string): Observable<any> {
    const url = `${this.baseURL}/track.lyrics.get`;
  
    const params = new HttpParams()
      .set('track_isrc', track_isrc) // Ensure this matches the API docs
      .set('apikey', this.apiKey);
  
    return this.http.get<any>(url, { params }).pipe(
      catchError((error) => {
        console.error('Error fetching lyrics:', error);
        return throwError(() => new Error('Failed to fetch lyrics'));
      })
    );
  }
  
  getTranslatedLyrics(trackID: number, selectedLanguage: string): Observable<any> {
    const url = `${this.baseURL}/track.lyrics.translation.get`;
  
    const params = new HttpParams()
      .set('track_id', trackID.toString())
      .set('selected_language', selectedLanguage)
      .set('apikey', this.apiKey);
  
    return this.http.get<any>(url, { params }).pipe(
      catchError(error => {
        console.error('Error in getLyrics:', error);
        return throwError(() => new Error('Failed to fetch lyrics'));
      })
    );
  }  
}
