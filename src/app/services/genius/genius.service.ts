import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GeniusService {

  constructor(private http: HttpClient) { }

  // getLyrics(songTitle: string, artistName: string): Observable<string> {
  //   return new Observable(observer => {
  //     getLyrics({
  //       apiKey: '15fw3vOtPRzfgU4PTOPfPpYuVUik1Sr6n8TUKukoKhdB4tunSkx4TdTqqB2N-aNK', // Replace with your actual API key
  //       title: 'La Patrulla',
  //       artist: 'Peso Pluma'
  //     }).then(lyrics => {
  //       observer.next(lyrics);
  //       observer.complete();
  //     }).catch(error => {
  //       observer.error(error);
  //     });
  //   });
  // }
}


// private readonly baseURL = 'https://api.genius.com'
  // private readonly accessToken = '15fw3vOtPRzfgU4PTOPfPpYuVUik1Sr6n8TUKukoKhdB4tunSkx4TdTqqB2N-aNK'
  //Client ID: hS-BNb4UEPegTyB7DaxYY9KtRBDcir2293Wr0CXMCL6Iyx5Zpzsrn6DpnYbhEG3Y
  //Client Secret: RY9ZrDio7sQtgBs24MfQFLorZP-lHmq-oorJnGxtriHW2fHTgjMYydQCxlQgVKPSaRkeMZg-dHp0abQzRMQ0vQ
  //Client Access Token: 15fw3vOtPRzfgU4PTOPfPpYuVUik1Sr6n8TUKukoKhdB4tunSkx4TdTqqB2N-aNK