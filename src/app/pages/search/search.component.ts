import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SpotifyService } from "../../services/spotify/spotify.service";
import { FirebaseService } from "../../services/firebase/firebase.service";
import { Timestamp } from "@angular/fire/firestore";
import { SearchService } from "../../../search.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-search-results",
  standalone: true,
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
  imports: [CommonModule],
})
export class SearchComponent implements OnInit {
  searchResults: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private spotifyService: SpotifyService
  ) {}

  ngOnInit(): void {
    // const filter = this.route.snapshot.queryParamMap.get("query");
    // console.log("Filter:", filter);
    // this.spotifyService
    //   .getSearchRequest(filter as string)
    //   .then((results) => {
    //     console.log("Search results:", results);
    //     this.searchResults = results;
    //   })
    //   .catch((error) => {
    //     console.error("Error during search:", error);
    //   });
    // Subscribe to changes in the query parameters
    this.route.queryParamMap.subscribe((params) => {
      const filter = params.get("query"); // Get the 'query' parameter
      console.log("Filter:", filter);

      if (filter) {
        // Fetch search results for the new query
        this.spotifyService
          .getSearchRequest(filter)
          .then((results) => {
            console.log("Search results:", results);
            this.searchResults = results; // Update the results
          })
          .catch((error) => {
            console.error("Error during search:", error);
          });
      }
    });
  }
}

// @Component({
//   selector: "app-search",
//   templateUrl: "./search.component.html",
//   styleUrls: ["./search.component.css"],
// })
// export class SearchComponent implements OnInit {
//   query: string = "";
//   results: string[] = [];

//   constructor(
//     private route: ActivatedRoute,
//     private spotifyService: SpotifyService,
//     private fireStore: FirebaseService
//   ) {}

//   ngOnInit() {
//     // Retrieve the query from the route parameters
//     this.route.queryParams.subscribe((params) => {
//       this.query = params["query"] || "";
//       if (this.query.trim()) {
//         this.performSearch();
//       }
//     });
//   }

//   private async performSearch() {
//     try {
//       console.log("Performing search for query:", this.query);
//       const response = await this.spotifyService.getSearchRequest(this.query);
//       this.results = response.map((item: { name: string }) => item.name);
//       console.log("Search results:", this.results);

//       const userID = await this.spotifyService.getUserName();
//       const recentSearch = {
//         query: this.query.trim(),
//         timestamp: Timestamp.now(),
//       };

//       await this.fireStore.addRecentSearch(userID, recentSearch);
//       console.log("Added to recent searches:", recentSearch);
//     } catch (error) {
//       console.error("Error during search:", error);
//     }
//   }
// }
