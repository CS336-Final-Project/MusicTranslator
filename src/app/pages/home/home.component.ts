import { Component, OnInit } from "@angular/core";
import { RouterOutlet, RouterLink } from "@angular/router";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from "@angular/common";
import { SpotifyService } from "../../services/spotify/spotify.service";
import { MusicCardComponent } from "../../components/music-card/music-card.component";
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    CommonModule,
    MusicCardComponent,
    SearchBarComponent,
  ],
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  userName: string = "";
  usersTopArtists: Array<string> = [];
  usersTopTracks: Array<string> = [];
  usersRecentlyPlayedTracks: Array<string> = [];

  //usersSavedTracks: Array<string> = [];
  //savedAlbums: Array<string> = [];
  //getAlbumInfo: string = '';

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    if (this.spotifyService.isLoggedIn()) {
      this.spotifyService.getUserName().then((name) => (this.userName = name));
      this.spotifyService
        .getUsersTopArtists()
        .then((topArtists) => (this.usersTopArtists = topArtists));
      this.spotifyService
        .getUsersTopTracks()
        .then((topTracks) => (this.usersTopTracks = topTracks));
      this.spotifyService
        .getUsersRecentlyPlayedTracks()
        .then(
          (recentlyPlayed) => (this.usersRecentlyPlayedTracks = recentlyPlayed)
        );

      //this.spotifyService.getUsersSavedAlbums().then((albums) => (this.savedAlbums = albums));
      //this.spotifyService.getUsersSavedTracks().then((tracks) => (this.usersSavedTracks = tracks));
    }
  }

  // search variables
  searchResults: string[] | null = null; // Stores search results
  isSearchActive: boolean = false; // Tracks whether search results should be displayed

  // Method to handle search results emitted by the search bar
  handleSearchResults(results: string[]) {
    this.searchResults = results;
    this.isSearchActive = true; // Switch to search mode
  }

  // method to reset hoem page while searching
  resetHome() {
    this.searchResults = null;
    this.isSearchActive = false; // Switch back to default content
  }
}
