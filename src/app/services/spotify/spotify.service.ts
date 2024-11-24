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
      // Check for access token in the URL (only in browser)
      const hash = window.location.hash.substring(1);
      const params = new URLSearchParams(hash);
      const accessToken = params.get('access_token');

      if (accessToken) {
        this.spotifyWebApi.setAccessToken(accessToken);
        localStorage.setItem('spotify_access_token', accessToken);
        window.history.replaceState(null, '', window.location.pathname); // Clean URL
      }
    }
  }

  getAccessToken() {
    if (!this.isBrowser) {
      throw new Error('Cannot authenticate outside of a browser environment.');
    }

    const clientId = 'YOUR_CLIENT_ID';
    const redirectUri = 'YOUR_REDIRECT_URI'; // Replace with your app's redirect URI
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

    window.location.href = authUrl; // Redirect the user to Spotify's login page
  }

  isLoggedIn(): boolean {
    if (!this.isBrowser) {
      return false;
    }
    return !!localStorage.getItem('spotify_access_token');
  }
}