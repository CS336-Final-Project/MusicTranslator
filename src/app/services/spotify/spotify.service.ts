import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import SpotifyWebApi from 'spotify-web-api-js';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  spotifyWebApi: SpotifyWebApi.SpotifyWebApiJs;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.spotifyWebApi = new SpotifyWebApi();
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      const hash = window.location.hash.substring(1);
      const params = new URLSearchParams(hash);
      const accessToken = params.get('access_token');

      if (accessToken) {
        this.spotifyWebApi.setAccessToken(accessToken);
        localStorage.setItem('spotify_access_token', accessToken);
        window.history.replaceState(null, '', window.location.pathname);
      } else {
        console.warn('No access token found in URL. User may need to log in.');
      }
    }
  }

  getAccessToken(): void {
    if (!this.isBrowser) {
      throw new Error('Cannot authenticate outside of a browser environment.');
    }

    const clientId = 'eb64fd7b14bb4b68992e0cf779a78070';
    const redirectUri = 'http://localhost:4200/';
    const scopes = [
      'user-read-private',
      'user-read-email',
      'playlist-read-private',
      'playlist-read-collaborative',
      'user-library-read',
    ].join(' ');

    const authUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientId}&scope=${encodeURIComponent(
      scopes
    )}&redirect_uri=${encodeURIComponent(redirectUri)}`;

    window.location.href = authUrl;
  }

  isLoggedIn(): boolean {
    if (!this.isBrowser) {
      return false;
    }
    const token = localStorage.getItem('spotify_access_token');
    return !!token;
  }

  getUserName(): Promise<string> {
    if (!this.isLoggedIn()) {
      console.warn('User is not logged in. Redirecting to login.');
      this.getAccessToken();
      return Promise.resolve('');
    }

    const token = localStorage.getItem('spotify_access_token');
    this.spotifyWebApi.setAccessToken(token!);

    return this.spotifyWebApi.getMe()
      .then((response) => response.display_name || '')
      .catch((error) => {
        console.error('Error fetching user name:', error);
        if (error.status === 401) {
          console.log('Access token expired. Redirecting to login.');
          this.getAccessToken();
        }
        return '';
      });
  }
}
