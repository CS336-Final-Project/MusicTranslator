import { Component, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { SpotifyService } from "../../services/spotify/spotify.service";
import { MatToolbarModule } from "@angular/material/toolbar";

// @Component({
//   selector: "app-search-bar",
//   standalone: true,
//   imports: [FormsModule, MatToolbarModule],
//   templateUrl: "./search-bar.component.html",
//   styleUrl: "./search-bar.component.css",
// })
// export class SearchBarComponent {
//   query: string = "";
//   @Output() resultsEmitter = new EventEmitter<string[]>(); // Emit search results
//   constructor(private spotifyService: SpotifyService, private router: Router) {}
//   async sendSearch() {
//     if (!this.query.trim()) {
//       console.warn("Search query is empty. Please enter a valid query.");
//       return;
//     }
//     try {
//       console.log(`Searching for: ${this.query}`);
//       const results = await this.spotifyService.getSearchRequest(this.query);
//       const resultNames = results.map((result) => result.name);
//       this.resultsEmitter.emit(resultNames); // Emit results to parent
//       this.router.navigate(["/search"]);
//       console.log("Search results:", resultNames);
//     } catch (error) {
//       console.error("Error during search:", error);
//     }
//   }
// }

// import { Component, Output, EventEmitter, Query } from "@angular/core";
// import { Router } from "@angular/router";
// import { FormsModule } from "@angular/forms";
// import { SpotifyService } from "../../services/spotify/spotify.service";
// import { FirebaseService } from "../../services/firebase/firebase.service";
// import { MatToolbarModule } from "@angular/material/toolbar";
// import { Timestamp } from "@angular/fire/firestore";
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
    private router: Router
  ) {}
 
  async sendSearch() {
    //   if (!this.query.trim()) {
    //     console.warn('Search query is empty. Please enter a valid query.');
    //     return;
    //   }
 
    //   try {
    //     console.log(`Searching for: ${this.query}`);
 
    //     const response = await this.spotifyService.getSearchRequest(this.query);
    //     const results = response.map((item: { name: string }) => item.name);
    //     this.resultsEmitter.emit(results); // Emit results to the parent
 
    //     await this.router.navigate(['/search']);
    //     console.log("Search results:", results);
 
    //     const userID = await this.spotifyService.getUserName();
    //     const recentSearch = {
    //       query: this.query.trim(),
    //       timestamp: Timestamp.now()
    //     };
 
    //     await this.fireStore.addRecentSearch(userID, recentSearch);
 
    //     console.log('Added to recent searches: ', recentSearch)
 
    //   } catch (error) {
    //     console.error('Error during search:', error);
    //   }
    // }
    // this.spotifyService.searchMusic(this.results).subscribe((res) => {
    //   this.results = res.artists.items;
    // });
 
    //
    //
    //
    // version 2 try
    // Ha Dong
 
    if (this.query.trim().length > 0) {
      // emitting results to export to homr component
 
      if (this.query.trim().length === 0) {
        this.results = [];
        this.resultsEmitter.emit(this.results); // Emit empty results
        return;
      }
 
      // calling the function in spotifyService.ts
      this.spotifyService
        .getSearchRequest(this.query)
        .then((results) => {
          this.results = results;
          // this.resultsEmitter.emit(this.results); // Emit results to the parent
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
      this.results = []; // Clear results when the query is empty
    }
  }
}
 
//
//
//
 
// Version 3
// Ha DOng
//SAVE THIS
/*
async sendSearch() {
    if (!this.query.trim()) {
      console.warn("Search query is empty. Please enter a valid query.");
      return;
    }
    try {
      console.log(`Searching for: ${this.query}`);
      const response = await this.spotifyService.getSearchRequest(this.query);
      const results = response.map((item: { name: string }) => item.name);
      this.resultsEmitter.emit(results); // Emit results to the parent
      console.log("Search results:", results);
    } catch (error) {
      console.error("Error during search:", error);
    }
  }
*/
