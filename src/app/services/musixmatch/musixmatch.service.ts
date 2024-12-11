import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MusixmatchService {
  private readonly apiKey: string;
  private readonly baseURL: string;

  constructor(private http: HttpClient) {
    this.apiKey = 'ec38857dd7a49d6164ba60cc0c06e45d';
    this.baseURL = 'https://api.musixmatch.com/ws/1.1';
  }

  getTranslatedSubtitle(commontrackID: number, selectedLanguage: string): Observable<any> {
    const url = `${this.baseURL}/track.subtitle.translation.get`;
    const params = {
      commontrack_id: commontrackID,
      selected_language: selectedLanguage,
      apikey: this.apiKey,
    };

    return this.http.get(url, { params });
  }
}