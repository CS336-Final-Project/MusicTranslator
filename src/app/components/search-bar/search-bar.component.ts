import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SpotifyService } from '../../services/spotify/spotify.service';
import { FirebaseService } from '../../services/firebase/firebase.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule, MatToolbarModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  query: string = '';
  @Output() resultsEmitter = new EventEmitter<string[]>(); // Emit search results

  constructor(private spotifyService: SpotifyService, private fireStore: FirebaseService, private router: Router) {}

  async sendSearch() {
    if (!this.query.trim()) {
      console.warn('Search query is empty. Please enter a valid query.');
      return;
    }

    try {
      console.log(`Searching for: ${this.query}`);

      const results = await this.spotifyService.getSearchRequest(this.query);
      const resultNames = results.map(result => result.name);
      this.resultsEmitter.emit(resultNames); // Emit results to parent

      await this.router.navigate(['/listen']);
      console.log('Search results:', resultNames);

      const userID = await this.spotifyService.getUserName();
      const recentSearch = {
        query: this.query.trim(),
        timestamp: Timestamp.now()
      };

      await this.fireStore.addRecentSearch(userID, recentSearch);

      console.log('Added to recent searches: ', recentSearch)

    } catch (error) {
      console.error('Error during search:', error);
    }
  }
}
