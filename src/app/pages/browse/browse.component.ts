import { Component, OnInit } from '@angular/core';
import { CategoryCardComponent } from '../../components/category-card/category-card.component';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from "@angular/common";
import { SpotifyService } from '../../services/spotify/spotify.service';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [CategoryCardComponent, MatIconModule, MatToolbarModule, CommonModule],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.css'
})
export class BrowseComponent implements OnInit {
  spanishCategory: { name: string; image: string} | null = null;
  chineseCategory: { name: string; image: string} | null = null
  frenchCategory: { name: string; image: string} | null = null
  italianCategory: { name: string; image: string} | null = null
  hindiCategory: { name: string; image: string} | null = null
  russianCategory: { name: string; image: string} | null = null

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit(): void {
      if (this.spotifyService.isLoggedIn()) {
        
      }
  }

}
