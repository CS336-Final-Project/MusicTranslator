import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify/spotify.service';
import { FirebaseService } from '../../services/firebase/firebase.service';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  query: string = '';
  results: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private spotifyService: SpotifyService,
    private fireStore: FirebaseService
  ) {}

  ngOnInit() {
    // Retrieve the query from the route parameters
    this.route.queryParams.subscribe((params) => {
      this.query = params['query'] || '';
      if (this.query.trim()) {
        this.performSearch();
      }
    });
  }

  private async performSearch() {
    try {
      console.log('Performing search for query:', this.query);
      const response = await this.spotifyService.getSearchRequest(this.query);
      this.results = response.map((item: { name: string }) => item.name);
      console.log('Search results:', this.results);

      const userID = await this.spotifyService.getUserName();
      const recentSearch = {
        query: this.query.trim(),
        timestamp: Timestamp.now(),
      };

      await this.fireStore.addRecentSearch(userID, recentSearch);
      console.log('Added to recent searches:', recentSearch);
    } catch (error) {
      console.error('Error during search:', error);
    }
  }
}