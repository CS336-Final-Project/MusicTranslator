declare module 'genius-lyrics-api' {
    export interface options {
        title: string;
        artist: string;
        apiKey: string;		// Genius developer access token
        optimizeQuery?: boolean; // (optional, default: false) If true, perform some cleanup to maximize the chance of finding a match
        authHeader?: boolean; // (optional, default: false) Whether to include auth header in the search request
    }
  
    export interface song {
        id: number;		// Genius song id
        title: string;          // Song title
        url: string;		// Genius webpage URL for the song
        lyrics: string;		// Song lyrics
        albumArt: string;	// URL of the album art image (jpg/png)
    }
  
    export interface searchResult {
        id: number;		// Genius song id
        url: string;		// Genius webpage URL for the song
        title: string;		// Song title
        albumArt: string;	// URL of the album art image (jpg/png)
    }
  
    export function getLyrics(options: Options | string): Promise<string | null>;
    export function getAlbumArt(options: Options): Promise<string | null>;
    export function getSong(options: Options): Promise<Song | null>;
    export function searchSong(options: Options): Promise<SearchResult[] | null>;
    export function getSongById(
      id: number | string,
      accessToken: string
    ): Promise<Song | null>;
  }  