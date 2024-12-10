import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { PlaybackComponent } from './components/playback/playback.component';
//import { SpotifyService } from './services/spotify/spotify.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, SearchBarComponent, PlaybackComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'musicTranslator';

  searchResults: string[] = [];

  handleSearchResults(results: string[]) {
    this.searchResults = results;
  }
}