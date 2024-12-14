import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SearchService {
  // Use a BehaviorSubject to emit and store the search results.
  private searchResultsSource = new BehaviorSubject<any[]>([]);
  searchResults$ = this.searchResultsSource.asObservable(); // Observable to subscribe to

  constructor() {}

  // Method to update the search results
  setSearchResults(results: any[]) {
    this.searchResultsSource.next(results);
  }
}
