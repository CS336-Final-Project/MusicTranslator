import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SpotifyService } from "../../services/spotify/spotify.service";
import { MusicCardComponent } from "../../components/music-card/music-card.component";
import { FirebaseService } from "../../services/firebase/firebase.service";
import { Timestamp } from "@angular/fire/firestore";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-search-results",
  standalone: true,
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
  imports: [CommonModule, MusicCardComponent],
})
export class SearchComponent implements OnInit {
  searchResults: Array<{ type: string, name: string, image: string, artist: string, trackID: string, isrc: string}> = [];

  constructor(
    private route: ActivatedRoute,
    private spotifyService: SpotifyService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const filter = params.get("query");
      console.log("Filter:", filter);

      if (filter) {
        this.spotifyService
          .getSearchRequest(filter)
          .then((results) => {
            console.log("Search results:", results);
            this.searchResults = results;
          })
          .catch((error) => {
            console.error("Error during search:", error);
          });
      }
    });
  }
}