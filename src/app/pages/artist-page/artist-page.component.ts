import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-artist-page',
  standalone: true,
  imports: [],
  templateUrl: './artist-page.component.html',
  styleUrl: './artist-page.component.css'
})
export class ArtistPageComponent implements OnInit {
  topTracks: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.topTracks = params['topTracks'] ?? '';
      console.log('Top tracks:', this.topTracks);
    });
  }  
}