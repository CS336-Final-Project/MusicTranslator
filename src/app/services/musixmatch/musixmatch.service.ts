import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MusixMatchService {
  private readonly apiKey: string;
  private readonly baseURL: string;

  constructor(private http: HttpClient) {
    this.apiKey = 'ec38857dd7a49d6164ba60cc0c06e45d';
    this.baseURL = 'https://api.musixmatch.com/ws/1.1';
  }

  getTranslatedSubtitle(
    selectedLanguage: string,
    commontrackID: number,
    minCompleted: number = 1 // Default to fully completed translations
  ): Observable<any> {
    const url = `${this.baseURL}/track.subtitle.translation.get`;

    const params = new HttpParams()
      .set('commontrack_id', commontrackID.toString())
      .set('selected_language', selectedLanguage)
      .set('min_completed', minCompleted.toString())
      .set('apikey', this.apiKey);

    return this.http.get(url, { params });
  }
}
