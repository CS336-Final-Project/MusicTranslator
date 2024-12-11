import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [MatToolbarModule, FormsModule], // Ensure MatToolbarModule is imported here
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  query: string = '';

  sendSearch() {
    console.log('Search query:', this.query);
  }
}