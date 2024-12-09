import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SpotifyService } from '../../services/spotify/spotify.service';
import { MatToolbarModule } from '@angular/material/toolbar';

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

  constructor(private spotifyService: SpotifyService, private router: Router) {}

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
    } catch (error) {
      console.error('Error during search:', error);
    }
  }
}
