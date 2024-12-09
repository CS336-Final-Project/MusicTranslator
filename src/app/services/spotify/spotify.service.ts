import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import SpotifyWebApi from "spotify-web-api-js";

@Injectable({
  providedIn: "root",
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
      const accessToken = params.get("access_token");

      if (accessToken) {
        this.spotifyWebApi.setAccessToken(accessToken);
        localStorage.setItem("spotify_access_token", accessToken);
        window.history.replaceState(null, "", window.location.pathname);
      } else {
        const storedToken = localStorage.getItem("spotify_access_token");
        if (storedToken) {
          this.spotifyWebApi.setAccessToken(storedToken);
        } else {
          console.warn(
            "No access token found in URL or local storage. User may need to log in."
          );
        }
      }
    }
  }

  getAccessToken(): void {
    if (!this.isBrowser) {
      throw new Error("Cannot authenticate outside of a browser environment.");
    }

    const clientId = "eb64fd7b14bb4b68992e0cf779a78070";
    const redirectUri = "http://localhost:4200/";
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
      "user-read-currently-playing",

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
    if (!this.isBrowser) {
      return false;
    }
    const token = localStorage.getItem("spotify_access_token");
    return !!token;
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
  //Get Several Albums

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
        //this.handleTokenError(error); // Handle token expiration or other issues
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

  /*Artist Info*/
  //Get Artist
  //Get Several Artists
  //Get Artist's Albumns
  //Get Artist's Top Tracks
  //Get Artist's Related Artists

  /*Categories*/
  //Get Several Browse Categories
  //Get Single Browse Category

  /*Genres*/
  //Get Available Genre Seeds

  /*Player*/

  /*Playlists*/

  /*Search*/
  getSearchRequest(
    query: string,
    options?: object
  ): Promise<{ type: string; name: string }[]> {
    if (!this.isLoggedIn()) {
      console.warn("User is not logged in. Redirecting to login.");
      this.getAccessToken();
      return Promise.reject("User not logged in");
    }

    return this.spotifyWebApi
      .search(query, ["album", "artist", "playlist", "track"], options)
      .then((response: any) => {
        const results: { type: string; name: string }[] = [];

        // Process 'artist' results
        const artists = response["artists"]?.items || [];
        artists.forEach((artist: any) => {
          if (artist?.name) {
            results.push({ type: "artist", name: artist.name });
          }
        });

        // Process 'track' results
        const tracks = response["tracks"]?.items || [];
        tracks.forEach((track: any) => {
          const trackName = track?.name || "Unknown Track";
          const artistName = track?.artists?.[0]?.name || "Unknown Artist";
          results.push({
            type: "track",
            name: `${trackName} by ${artistName}`,
          });
        });

        // Process 'album' results
        const albums = response["albums"]?.items || [];
        albums.forEach((album: any) => {
          const albumName = album?.name || "Unknown Album";
          const artistName = album?.artists?.[0]?.name || "Unknown Artist";
          results.push({
            type: "album",
            name: `${albumName} by ${artistName}`,
          });
        });

        // Process 'playlist' results
        const playlists = response["playlists"]?.items || [];
        playlists.forEach((playlist: any) => {
          if (playlist?.name) {
            results.push({
              type: "playlist",
              name: `${playlist.name} (Playlist)`,
            });
          }
        });

        // Limit results to 10 and return
        return results.slice(0, 10);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
        return Promise.reject("Error fetching search results");
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
        //this.handleTokenError(error); // Handle token expiration or other issues
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
        //this.handleTokenError(error); // Handle token expiration or other issues
        throw error;
      });
  }

  /*User Info*/
  getUserName(): Promise<string> {
    if (!this.isLoggedIn()) {
      console.warn("User is not logged in. Redirecting to login.");
      this.getAccessToken();
      return Promise.resolve("");
    }

    const token = localStorage.getItem("spotify_access_token");
    this.spotifyWebApi.setAccessToken(token!);

    return this.spotifyWebApi
      .getMe()
      .then((response) => response.display_name || "")
      .catch((error) => {
        console.error("Error fetching user name:", error);
        if (error.status === 401) {
          console.log("Access token expired. Redirecting to login.");
          this.getAccessToken();
        }
        return "";
      });
  }

  getUsersTopArtists(): Promise<string[]> {
    if (!this.isLoggedIn()) {
      console.warn("User is not logged in. Redirecting to login.");
      this.getAccessToken();
      return Promise.resolve([]);
    }

    return this.spotifyWebApi
      .getMyTopArtists({ limit: 5 })
      .then((response) => response.items.map((item) => item.name))
      .catch((error) => {
        console.error("Error fetching user top artists:", error);
        return [];
      });
  }

  getUsersTopTracks(): Promise<string[]> {
    if (!this.isLoggedIn()) {
      console.warn("User is not logged in. Redirecting to login.");
      this.getAccessToken();
      return Promise.resolve([]);
    }

    return this.spotifyWebApi
      .getMyTopTracks({ limit: 5 })
      .then((response) => response.items.map((item) => item.name))
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
