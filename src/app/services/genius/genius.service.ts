import { Injectable } from '@angular/core';
import { from, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeniusService {
  private readonly baseURL = 'https://api.genius.com';
  private readonly accessToken = environment.geniusAccessToken;

  constructor(private http: HttpClient) {}

  getSearchResults(query: string): Observable<any> {
    const url = `${this.baseURL}/search`;

    const params = new HttpParams()
     .set('q', query)
     .set('access_token', this.accessToken)

    return this.http.get<any>(url, { params }).pipe(
      catchError(error => {
        console.error('Error fetching search results:', error);
        return throwError(() => new Error('Failed to fetch search results from Genius API'));
      })
    );
  }

  getSongDetails(songID: number): Observable<any> {
    const url = `${this.baseURL}/songs/${songID}`;

    const params = new HttpParams()
     .set('access_token', this.accessToken);

    return this.http.get<any>(url, { params }).pipe(
      catchError(error => {
        console.error('Error fetching song details:', error);
        return throwError(() => new Error('Failed to fetch song details from Genius API'));
      })
    );
  }
}