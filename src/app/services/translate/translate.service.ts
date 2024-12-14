import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  private readonly apiKey = environment.translationKey;
  private readonly baseURL = 'https://translation.googleapis.com/v3';

  constructor(private http: HttpClient) { }

  translateText(
    text: string,
    targetLanguage: string,
    projectId: string,
    location: string = 'global'
  ): Observable<any> {
    const url = `${this.baseURL}/projects/${projectId}/locations/${location}:translateText`;

    const body = {
      contents: [text],
      targetLanguageCode: targetLanguage,
    };

    const params = new HttpParams()
      .set('content-type', 'application/json')
      .set('apikey', this.apiKey);

    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   Authorization: `Bearer ${this.apiKey}`,
    // });

    return this.http.post(url, body, { params });
  }

  // Detect language
  detectLanguage(
    text: string,
    projectId: string,
    location: string = 'global'
  ): Observable<any> {
    const url = `${this.baseURL}/projects/${projectId}/locations/${location}:detectLanguage`;

    const body = {
      content: text,
    };

    const params = new HttpParams()
      .set('content-type', 'application/json')
      .set('apikey', this.apiKey);

    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   Authorization: `Bearer ${this.apiKey}`,
    // });

    return this.http.post(url, body, { params });
  }
}
