import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError ,tap } from 'rxjs/operators';
import { isPlatformBrowser } from "@angular/common";
import { Router } from '@angular/router';
import SpotifyWebApi from "spotify-web-api-js";

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
}

@Injectable({
  providedIn: "root",
})
export class SpotifyService {
  spotifyWebApi: SpotifyWebApi.SpotifyWebApiJs;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient, private router: Router) {
    this.spotifyWebApi = new SpotifyWebApi();
    this.isBrowser = isPlatformBrowser(this.platformId);

    this.initializeAccessToken();
  }

  private initializeAccessToken(): void {
    if (!this.isBrowser) return;

    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get("access_token");
    const expiresIn = params.get("expires_in");

    if (accessToken) {
      // Set expiration time (optional, but recommended)
      const expirationTime = new Date().getTime() + parseInt(expiresIn || '3600') * 1000;
      
      this.spotifyWebApi.setAccessToken(accessToken);
      localStorage.setItem("spotify_access_token", accessToken);
      localStorage.setItem("spotify_token_expiration", expirationTime.toString());
      
      // Clear the hash from the URL
      window.history.replaceState(null, "", window.location.pathname);
    }
  }

  getAccessToken(): void {
    if (!this.isBrowser) {
      throw new Error("Cannot authenticate outside of a browser environment.");
    }

    const clientId = "eb64fd7b14bb4b68992e0cf779a78070";
    const redirectUri = "http://localhost:4200/";
    //const redirectUri = "https://tunelingual.web.app"
    const scopes = [
      "user-read-private",
      "user-read-email",
      "user-library-read",
      "user-library-modify",
      "user-top-read",
      "user-follow-read",
      "user-follow-modify",
      "user-read-playback-state",
      "user-read-currently-playing",
      "user-modify-playback-state",
      "user-read-recently-played",
      "playlist-read-private",
      "playlist-read-collaborative",
      "playlist-modify-public",
      "playlist-modify-private",
      "ugc-image-upload",
    ].join(" ");

    const authUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientId}&scope=${encodeURIComponent(
      scopes
    )}&redirect_uri=${encodeURIComponent(redirectUri)}`;

    window.location.href = authUrl;
  }

  isLoggedIn(): boolean {
    if (!this.isBrowser) return false;

    const token = localStorage.getItem("spotify_access_token");
    const expirationTime = localStorage.getItem("spotify_token_expiration");

    // Check if token exists and is not expired
    return !!(token && (!expirationTime || new Date().getTime() < parseInt(expirationTime)));
  }

  private getLocalStorageItem(key: string): string | null {
    try {
      return isPlatformBrowser(this.platformId) && typeof localStorage !== 'undefined' 
        ? localStorage.getItem(key) 
        : null;
    } catch {
      return null;
    }
  }

  // Safe method to set localStorage item
  private setLocalStorageItem(key: string, value: string): void {
    try {
      if (isPlatformBrowser(this.platformId) && typeof localStorage !== 'undefined') {
        localStorage.setItem(key, value);
      }
    } catch {}
  }

  // Safe method to remove localStorage item
  private removeLocalStorageItem(key: string): void {
    try {
      if (isPlatformBrowser(this.platformId) && typeof localStorage !== 'undefined') {
        localStorage.removeItem(key);
      }
    } catch {}
  }

  refreshAccessToken(): Observable<TokenResponse> {
    const refreshToken = this.getLocalStorageItem('refresh_token');
    const accessToken = this.getLocalStorageItem('access_token');
    
    // If no refresh token or access token, force re-login
    if (!refreshToken || !accessToken) {
      this.logout();
      this.router.navigate(['/login']);
      return throwError(() => new Error('No valid tokens available. Please log in again.'));
    }

    const body = new HttpParams()
      .set('grant_type', 'refresh_token')
      .set('refresh_token', refreshToken)
      .set('client_id', 'eb64fd7b14bb4b68992e0cf779a78070');

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post<TokenResponse>('https://accounts.spotify.com/api/token', body.toString(), { headers }).pipe(
      tap((response: TokenResponse) => {
        // Update access token in local storage
        this.setLocalStorageItem('access_token', response.access_token);
        
        // If a new refresh token is provided, update it
        if (response.refresh_token) {
          this.setLocalStorageItem('refresh_token', response.refresh_token);
        }
      }),
      catchError((error) => {
        // If token refresh fails, logout and redirect to login
        this.logout();
        this.router.navigate(['/login']);
        return throwError(() => new Error('Failed to refresh token. Please log in again.'));
      })
    );
  }

  logout() {
    // Clear all authentication-related items from local storage
    this.removeLocalStorageItem('access_token');
    this.removeLocalStorageItem('refresh_token');
    // Any additional logout logic
  }
  
  /*Album Info*/
  //Get Album
  getAlbum(albumId: string, options?: object): Promise<string> {
    if (!this.isLoggedIn()) {
      console.warn("User is not logged in. Redirecting to login.");
      this.getAccessToken();
      return Promise.reject("User not logged in");
    }

    return this.spotifyWebApi
      .getAlbum(albumId, options)
      .then((response) => {
        return response.name;
      })
      .catch((error) => {
        console.error("Error fetching album:", error);
        return Promise.reject("Error fetching album");
      });
  }
  //Get Artist Top Tracks
  getArtistTopTracks(artistID: string, options?: object): Promise<{ 
    name: string; 
    id: string; 
    image: string; 
    isrc: string; 
    album: string; 
    popularity: number; 
  }[]> {
    if (!this.isLoggedIn()) {
      console.warn("User is not logged in. Redirecting to login.");
      this.getAccessToken();
      return Promise.reject("User not logged in");
    }
  
    const region = (options as { region?: string })?.region || "US";
  
    return this.spotifyWebApi
      .getArtistTopTracks(artistID, region)
      .then((response) => {
        if (!response || !response.tracks) {
          throw new Error("No top tracks found for the artist");
        }
  
        return response.tracks.map((item) => ({
          name: item.name || "Unknown Track",
          id: item.id,
          isrc: item.external_ids?.isrc || "N/A",
          image: item.album.images[0]?.url || "N/A",
          album: item.album.name || "Unknown Album",
          popularity: item.popularity,
        }));
      })
      .catch((error) => {
        console.error("Error fetching artist top tracks:", error);
        return Promise.reject(error);
      });
  }  

  getArtist(artistID: string, options?: object): Promise<string> {
    if (!this.isLoggedIn()) {
      console.warn("User is not logged in. Redirecting to login.");
      this.getAccessToken();
      return Promise.reject("User not logged in");
    }

    return this.spotifyWebApi
     .getArtist(artistID, options)
     .then((response) => {return response.name});
  }
  

  //Get Album Tracks
  getAlbumTracks(albumId: string, options?: object): Promise<string[]> {
    if (!this.isLoggedIn()) {
      console.warn("User is not logged in. Redirecting to login.");
      this.getAccessToken();
      return Promise.reject("User not logged in");
    }

    return this.spotifyWebApi
      .getAlbumTracks(albumId, options)
      .then((response) => {
        return response.items.map((track) => track.name);
      })
      .catch((error) => {
        console.error("Error fetching album tracks:", error);
        return Promise.reject("Error fetching album tracks");
      });
  }

  //Get User's Saved Albums
  getUsersSavedAlbums(): Promise<Array<string>> {
    if (!this.isLoggedIn()) {
      console.warn("User is not logged in. Redirecting to login.");
      this.getAccessToken();
      return Promise.reject("User not logged in");
    }

    return this.spotifyWebApi
      .getMySavedAlbums({ limit: 10 })
      .then((response) => {
        return response.items.map((item) => item.album.name);
      })
      .catch((error) => {
        console.error("Error fetching saved albums:", error);
        return Promise.reject("Error fetching saved albums");
      });
  }

  addToSavedAlbums(albumIds: string[], options?: object): Promise<void> {
    if (!this.isLoggedIn()) {
      console.warn("User is not logged in. Redirecting to login.");
      this.getAccessToken();
      return Promise.reject("User not logged in");
    }

    return this.spotifyWebApi
      .addToMySavedAlbums(albumIds, options)
      .then(() => {
        console.log(
          `Successfully added one or more albums to the current user's Your Music library: ${albumIds.join(
            ", "
          )}`
        );
      })
      .catch((error: any) => {
        console.error("Error adding album to users music library:", error);
        throw error;
      });
  }

  removeFromSavedAlbums(albumIds: string[], options?: object): Promise<void> {
    if (!this.isLoggedIn()) {
      console.warn("User is not logged in. Redirecting to login.");
      this.getAccessToken();
      return Promise.reject("User not logged in");
    }

    return this.spotifyWebApi
      .removeFromMySavedAlbums(albumIds, options)
      .then(() => {
        console.log(
          `Successfully removed one or more albums from the current user's your music library: ${albumIds.join(
            ", "
          )}`
        );
      })
      .catch((error: any) => {
        console.error(
          "Error removing one or more albums from users music library:",
          error
        );
        //this.handleTokenError(error); // Handle token expiration or other issues
        throw error;
      });
  }

  // Playlist
  getPlaylist(
    playlistID: string,
    options?: object
  ): Promise<{ name: string; id: string; tracks: object }[]> {
    if (!this.isLoggedIn()) {
      console.warn("User is not logged in. Redirecting to login.");
      this.getAccessToken();
      return Promise.reject(new Error("User is not logged in"));
    }
  
    return this.spotifyWebApi.getPlaylist(playlistID, options)
      .then((response) => {
        if (!response || !response.tracks || !response.tracks.items) {
          console.warn("Invalid response structure");
          return [];
        }
  
        return response.tracks.items.map((item) => {
          const track = item.track;
          return {
            name: track?.name || "Unknown",
            id: track?.id || "Unknown ID",
            tracks: track || {}
          };
        });
      })
      .catch((error) => {
        console.error("Error fetching playlist data:", error.message || error);
        return [];
      });
  }
  
  
  

  /*Player*/
  playTrack(options: { uris: string[]; position_ms?: number }): Promise<void> {
    if (!this.isLoggedIn()) {
      console.warn("User is not logged in. Redirecting to login.");
      this.getAccessToken();
      return Promise.reject("User not logged in");
    }
  
    return this.spotifyWebApi
      .play(options)
      .then(() => {
        console.log("Playback started successfully");
      })
      .catch((error) => {
        console.error("Error starting playback:", error);
        throw error; // Propagate the error for further handling if needed
      });
  }  

  getCurrentPlayingTrack(options?: object): Promise<any> {
    if (!this.isLoggedIn()) {
      console.warn("User is not logged in. Redirecting to login.");
      this.getAccessToken();
      return Promise.reject("User not logged in");
    }
  
    return this.spotifyWebApi
      .getMyCurrentPlayingTrack(options)
      .then((response) => {
        if (!response || !response.item) {
          return Promise.reject("No track currently playing");
        }
  
        const item = response.item;
        return {
          name: item.name || "Unknown",
          image: item.album?.images?.[0]?.url || "",
          artist: item.artists?.[0]?.name || "Unknown",
          id: item.external_ids?.isrc || "",
        };
      })
      .catch((error) => {
        console.error("Error fetching current playing track:", error);
        return Promise.reject(error);
      });
  }  




  /*Search*/
  getSearchRequest(
    query: string,
    options?: Record<string, any>
  ): Promise<{ type: string; name: string; image: string; artist: string; trackID: string; isrc: string }[]> {
    if (!this.isLoggedIn()) {
      console.warn("User is not logged in. Redirecting to login.");
      this.getAccessToken();
      return Promise.reject(new Error("User not logged in"));
    }
  
    return this.spotifyWebApi
      .search(query, ["track"], options)
      .then((response: any) => {
        const tracks = response?.tracks?.items || [];
  
        // Map and transform the tracks into the desired result format
        const results = tracks.map((track: any) => ({
          type: "track",
          name: track?.name || "Unknown Track",
          image: track?.album?.images?.[0]?.url || "",
          artist: track?.artists?.[0]?.name || "Unknown Artist",
          trackID: track?.id || "",
          isrc: track?.external_ids?.isrc || "",
        }));
  
        // Return only the first 10 results
        return results.slice(0, 10);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error.message || error);
        return Promise.reject(new Error("Failed to fetch search results. Please try again."));
      });
  }
  

  /*Tracks*/
  getUsersSavedTracks(): Promise<string[]> {
    if (!this.isLoggedIn()) {
      console.warn("User is not logged in. Redirecting to login.");
      this.getAccessToken();
      return Promise.reject("User not logged in");
    }

    return this.spotifyWebApi
      .getMySavedTracks()
      .then((response) => {
        return response.items.map((item) => item.track.name);
      })
      .catch((error) => {
        console.error("Error fetching saved tracks:", error);
        return Promise.reject("Error fetching saved tracks");
      });
  }

  addToUsersSavedTracks(trackIds: string[], options?: object): Promise<void> {
    if (!this.isLoggedIn()) {
      console.warn("User is not logged in. Redirecting to login.");
      this.getAccessToken();
      return Promise.reject("User not logged in");
    }

    return this.spotifyWebApi
      .addToMySavedTracks(trackIds, options)
      .then(() => {
        console.log(
          `Tracks successfully added to saved tracks: ${trackIds.join(", ")}`
        );
      })
      .catch((error: any) => {
        console.error("Error adding tracks to saved tracks:", error);
        throw error;
      });
  }

  removeFromUsersSavedTracks(
    trackIds: string[],
    options?: object
  ): Promise<void> {
    if (!this.isLoggedIn()) {
      console.warn("User is not logged in. Redirecting to login.");
      this.getAccessToken();
      return Promise.reject("User not logged in");
    }

    return this.spotifyWebApi
      .addToMySavedTracks(trackIds, options)
      .then(() => {
        console.log(
          `Tracks successfully removed from saved tracks: ${trackIds.join(
            ", "
          )}`
        );
      })
      .catch((error: any) => {
        console.error("Error removing tracks from saved tracks:", error);
        throw error;
      });
  }

  /*User Info*/
  getUser(): Promise<{ display_name: string; image: string; email: string; id: string } | string> {
    if (!this.isLoggedIn()) {
      console.warn("User is not logged in. Redirecting to login.");
      this.getAccessToken();
      return Promise.resolve("User not logged in.");
    }
  
    const token = localStorage.getItem("spotify_access_token");
    if (!token) {
      console.error("No access token found. Redirecting to login.");
      this.getAccessToken();
      return Promise.resolve("No access token found.");
    }
  
    this.spotifyWebApi.setAccessToken(token);
  
    return this.spotifyWebApi
      .getMe()
      .then((response: any) => {
        const displayName = response.display_name || "Unknown User";
        const image = response.images?.[0]?.url || "";
        const email = response.email || "";
        const id = response.id || "";
        return { display_name: displayName, image, email, id };
      })
      .catch((error: any) => {
        console.error("Error fetching user information:", error);
        if (error.status === 401) {
          console.log("Access token expired. Redirecting to login.");
          this.getAccessToken();
        }
        return "Error fetching user information.";
      });
  }
  

  getUsersTopArtists(): Promise<{ name: string; image: string; genre: string; id: string; }[]> {
    if (!this.isLoggedIn()) {
      console.warn("User is not logged in. Redirecting to login.");
      this.getAccessToken();
      return Promise.resolve([]);
    }
  
    return this.spotifyWebApi
      .getMyTopArtists({ limit: 6 })
      .then((response) =>
        response.items.map((item) => ({
          name: item.name,
          image: item.images?.[0]?.url || "",
          genre: item.genres?.[0] || "Unknown",
          id: item.id
        }))
      )
      .catch((error) => {
        console.error("Error fetching user top artists:", error);
        return [];
      });
  }
  

  getUsersTopTracks(): Promise<{ name: string; image: string; artist: string; id: string; isrc: string }[]> {
    if (!this.isLoggedIn()) {
      console.warn("User is not logged in. Redirecting to login.");
      this.getAccessToken();
      return Promise.resolve([]);
    }
  
    return this.spotifyWebApi
      .getMyTopTracks({ limit: 6 })
      .then((response) =>
        response.items.map((item) => ({
          name: item.name,
          image: item.album.images?.[0]?.url || "",
          artist: item.artists ?.[0]?.name || "Unknown", 
          id: item.id,
          isrc: item.external_ids.isrc || ""
          //id: item.external_ids.isrc || "",
        }))
      )
      .catch((error) => {
        console.error("Error fetching user top tracks:", error);
        return [];
      });
  }  

  getUsersRecentlyPlayedTracks(): Promise<string[]> {
    if (!this.isLoggedIn()) {
      console.warn("User is not logged in. Redirecting to login.");
      this.getAccessToken();
      return Promise.resolve([]);
    }

    return this.spotifyWebApi
      .getMyRecentlyPlayedTracks()
      .then((response) => response.items.map((item) => item.track.name))
      .catch((error) => {
        console.error("Error fetching user recently played tracks:", error);
        return [];
      });
  }
}