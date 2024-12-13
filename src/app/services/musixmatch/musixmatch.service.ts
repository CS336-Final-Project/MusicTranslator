import { Injectable } from '@angular/core';
import { Observable, throwError, catchError } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';


//apiKey = 'ec38857dd7a49d6164ba60cc0c06e45d';

export interface SubtitleTranslationResponse {
  message: {
    header: {
      status_code: number;
      execute_time: number;
      instrumental: number
    };
    body: {
      subtitle: {
        subtitle_id: string;
        restricted: number;
        published_status: number;
        subtitle_body: string
      };
    };
  };
}

@Injectable({
  providedIn: 'root',
})
export class MusixMatchService {
  private readonly apiKey = environment.musixmatchApiKey;
  private readonly baseURL = 'https://api.musixmatch.com/ws/1.1';

  constructor(private http: HttpClient) {}

  getTrack(trackID: number): Observable<any> {
    const url = `${this.baseURL}/track.get`;
  
    const params = new HttpParams()
      .set('track_id', trackID.toString())
      .set('apikey', this.apiKey);
  
    return this.http.get<any>(url, { params }).pipe(
      catchError(error => {
        console.error('API Error:', error);
        return throwError(() => new Error('Failed to fetch track details'));
      })
    );
  }  

  getTranslatedSubtitle(
    selectedLanguage: string,
    commontrackID: number,
    minCompleted: number = 1
  ): Observable<SubtitleTranslationResponse> {
    const url = `${this.baseURL}/track.subtitle.translation.get`;

    const params = new HttpParams()
      .set('commontrack_id', commontrackID.toString())
      .set('selected_language', selectedLanguage)
      .set('min_completed', minCompleted.toString())
      .set('apikey', this.apiKey);

    return this.http.get<SubtitleTranslationResponse>(url, { params }).pipe(
      catchError(error => {
        console.error('API Error:', error);
        return throwError(() => new Error('Failed to fetch subtitles'));
      })
    );
  }
}
