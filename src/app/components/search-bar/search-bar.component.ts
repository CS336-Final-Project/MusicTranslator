import { Component, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { SpotifyService } from "../../services/spotify/spotify.service";
import { MatToolbarModule } from "@angular/material/toolbar";
import { SearchService } from "../../../search.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-search-bar",
  standalone: true,
  imports: [FormsModule, MatToolbarModule, CommonModule],
  templateUrl: "./search-bar.component.html",
  styleUrl: "./search-bar.component.css",
  providers: [SpotifyService],
})
export class SearchBarComponent {
  query: string = "";
  @Output() resultsEmitter = new EventEmitter<
    { type: string; name: string }[]
  >(); // Emit search results

  results: { type: string; name: string }[] = []; // Results from Spotify API

  constructor(
    private spotifyService: SpotifyService,
    // private fireStore: FirebaseService,
    private router: Router,
    private searchService: SearchService
  ) {}

  async sendSearch() {
    if (this.query.trim().length > 0) {
      // emitting results to export to homr component

      if (this.query.trim().length === 0) {
        this.results = [];
        this.resultsEmitter.emit(this.results); // Emit empty results
        return;
      }

      this.router.navigate(["/search"], {
        queryParams: { query: this.query },
      });
      // calling the function in spotifyService.ts
    } else {
      this.results = []; // Clear results when the query is empty
    }
  }
}
