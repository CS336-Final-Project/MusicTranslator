import { Component, OnInit } from "@angular/core";
import { RouterOutlet, RouterLink } from "@angular/router";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from "@angular/common";
import { SpotifyService } from "../../services/spotify/spotify.service";
import { MusicCardComponent } from "../../components/music-card/music-card.component";
import { ArtistCardComponent } from "../../components/artist-card/artist-card.component";


@Component({
  selector: "app-home",
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    CommonModule,
    MusicCardComponent,
    ArtistCardComponent
  ],
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  user: { display_name: string; image: string } | null = null;
  usersTopArtists: Array<{ name: string; image: string, genre: string }> = []; // Updated type
  usersTopTracks: Array<{ name: string; image: string, artist: string, id: string}> = [];
  usersRecentlyPlayedTracks: Array<string> = [];
  errorMessage: string = "";

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    if (this.spotifyService.isLoggedIn()) {
      this.spotifyService.getUser()
        .then((userInfo) => {
          if (typeof userInfo === "string") {
            this.errorMessage = userInfo;
          } else {
            this.user = userInfo;
          }
        });
      this.spotifyService
        .getUsersTopArtists()
        .then((topArtists) => (this.usersTopArtists = topArtists)); // Updated logic
      this.spotifyService
        .getUsersTopTracks()
        .then((topTracks) => (this.usersTopTracks = topTracks));
      this.spotifyService
        .getUsersRecentlyPlayedTracks()
        .then(
          (recentlyPlayed) => (this.usersRecentlyPlayedTracks = recentlyPlayed)
        );
    }
  }
}
