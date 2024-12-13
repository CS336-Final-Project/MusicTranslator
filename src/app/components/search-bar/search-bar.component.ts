import { Component, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { SpotifyService } from "../../services/spotify/spotify.service";
import { MatToolbarModule } from "@angular/material/toolbar";
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
  >();
 
  user: { display_name: string; image: string } | null = null;
  results: { type: string; name: string }[] = [];
  errorMessage: string = "";
 
  constructor(
    private spotifyService: SpotifyService,
    private router: Router
  ) {}
 
  async sendSearch() {
    if (this.query.trim().length > 0) {
 
      if (this.query.trim().length === 0) {
        this.results = [];
        this.resultsEmitter.emit(this.results);
        return;
      }
 
      this.spotifyService
        .getSearchRequest(this.query)
        .then((results) => {
          this.results = results;
          this.router.navigate(["/search"]),
            {
              queryParams: { query: this.query },
            };
 
          console.log("Search results:", results);
        })
        .catch((error) => {
          console.error("Error during search:", error);
          this.results = [];
          this.resultsEmitter.emit(this.results);
        });
    } else {
      this.results = [];
    }
  }

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
      }
  }
}
